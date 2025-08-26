<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { supabase } from '$lib/supabase';
  import { EventController } from '$lib/controllers/event.controller';
  import BannerMarquee from '$lib/components/banner-marquee.svelte';
  import type { PageData } from './$types';
  
  let { data } = $props();
  
  let events = $derived(data.events || []);
  let userReminders = $derived(data.userReminders || []);
  let loading = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');

  // Get user from session data
  let currentUser = $derived(data.session?.user || null);

  // Create a map of event IDs to reminders for quick lookup
  let reminderMap = $derived(new Map(userReminders.filter((reminder: any) => reminder && reminder.event_id).map((reminder: any) => [reminder.event_id, reminder])));

  async function setReminder(eventId: string, reminderTime: string) {
    if (!reminderTime) {
      errorMessage = 'Please select a reminder time';
      return;
    }

    if (!currentUser) {
      errorMessage = 'You must be logged in to set reminders';
      return;
    }

    loading = true;
    errorMessage = '';
    successMessage = '';

    try {
      const formData = new FormData();
      formData.append('eventId', eventId);
      formData.append('reminderTime', reminderTime);

      const response = await fetch('?/createReminder', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('Server response:', result); // Debug log

      // Handle SvelteKit form action response format
      let actionResult;
      if (result.type === 'success' && result.data) {
        try {
          // Parse the data if it's a string
          const parsedData = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
          
          // The response seems to be an array, extract the actual result object
          if (Array.isArray(parsedData)) {
            // Look for the object with success property
            actionResult = parsedData.find(item => item && typeof item === 'object' && 'success' in item);
            if (!actionResult) {
              // If no object with success property, use the first object
              actionResult = parsedData.find(item => item && typeof item === 'object');
            }
          } else {
            actionResult = parsedData;
          }
        } catch (e) {
          console.error('Error parsing response:', e);
          actionResult = result.data;
        }
      } else {
        actionResult = result;
      }

      console.log('Parsed action result:', actionResult); // Debug log
      console.log('Action result success:', actionResult?.success); // Debug log
      console.log('Action result error:', actionResult?.error); // Debug log

      // Handle both boolean and numeric success values
      // But also check if there's an error - if there's an error, it's not a success
      const hasError = actionResult && actionResult.error;
      const isSuccess = actionResult && (actionResult.success === true || actionResult.success === 1) && !hasError;
      
      if (isSuccess) {
        successMessage = 'Reminder set successfully!';
        // Update the reminders list
        if (actionResult.data) {
          userReminders = [...userReminders, actionResult.data];
          reminderMap.set(eventId, actionResult.data);
        }
      } else {
        // Extract error message from the action result
        let errorMsg = 'Failed to set reminder';
        
        // First try to get error from the parsed action result
        if (actionResult && actionResult.error) {
          if (typeof actionResult.error === 'string') {
            errorMsg = actionResult.error;
          } else {
            // If error is not a string, try to get it from the original response data
            if (result.data && typeof result.data === 'string') {
              try {
                const parsedData = JSON.parse(result.data);
                if (Array.isArray(parsedData) && parsedData.length >= 3 && typeof parsedData[2] === 'string') {
                  errorMsg = parsedData[2];
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        } else if (result.data && typeof result.data === 'string') {
          // Fallback: try to get error from the original response data
          try {
            const parsedData = JSON.parse(result.data);
            if (Array.isArray(parsedData) && parsedData.length >= 3 && typeof parsedData[2] === 'string') {
              errorMsg = parsedData[2];
            }
          } catch (e) {
            // Ignore parsing errors
          }
        }
        
        errorMessage = errorMsg;
        console.error('Reminder creation failed:', errorMsg); // Debug log
      }
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      loading = false;
    }
  }

  function hasReminder(eventId: string): boolean {
    return reminderMap.has(eventId);
  }

  function getReminderTime(eventId: string): string {
    const reminder = reminderMap.get(eventId) as any;
    return reminder ? new Date(reminder.reminder_time).toLocaleString() : '';
  }
</script>

<div class="w-full min-h-[100dvh] pt-16 bg-[hsl(222.2_47.4%_11.2%)] text-white">
  <!-- Universe Link -->
  <a href="/" class="absolute top-4 left-4 z-10 text-sm font-extrabold leading-tight text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
    UNI<br/>VERSE
  </a>
  
  <!-- Banner Marquee - Below Navigation with proper spacing -->
  <div class="mt-8 mb-4">
    <BannerMarquee />
  </div>
  
  <div class="container mx-auto px-4 py-8">
    <!-- Messages -->
    {#if errorMessage}
      <div class="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
        {errorMessage}
      </div>
    {/if}
    
    {#if successMessage}
      <div class="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
        {successMessage}
      </div>
    {/if}
    
    <!-- Bento Grid Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 text-center">Quick Access</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <!-- Library Box -->
        <button class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 p-6 text-left">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="w-12 h-12 mb-4 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Library</h3>
            <p class="text-blue-200/80 text-sm">Access books, resources, and study materials</p>
          </div>
        </button>
        
        <!-- Cafeteria Box -->
        <button class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 p-6 text-left">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="w-12 h-12 mb-4 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Cafeteria</h3>
            <p class="text-orange-200/80 text-sm">Browse menus, order food, and check hours</p>
          </div>
        </button>
        
        <!-- Marketplace Box -->
        <button class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 p-6 text-left">
          <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="w-12 h-12 mb-4 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Marketplace</h3>
            <p class="text-green-200/80 text-sm">Buy, sell, and trade with other students</p>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Events Carousel Section -->
    {#if events.length > 0}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-6 text-center">Featured Events</h2>
        
        <div class="flex justify-center">
          <Carousel.Root class="w-full max-w-4xl">
            <Carousel.Content>
              {#each events as event (event.id)}
                <Carousel.Item>
                  <div class="p-1">
                    <Card.Root class="h-full">
                      <Card.Content class="flex flex-col h-full p-6">
                        <!-- Event Image -->
                        {#if event.image_url}
                          <div class="w-full h-48 mb-4 rounded-lg overflow-hidden">
                            <img 
                              src={event.image_url} 
                              alt={event.title}
                              class="w-full h-full object-cover"
                            />
                          </div>
                        {/if}
                        
                        <!-- Event Content -->
                        <div class="flex-1">
                          <!-- Event Type Badge -->
                          <div class="mb-3">
                            <span class="px-3 py-1 text-xs rounded-full bg-[hsl(210_40%_96%)] text-[hsl(222.2_47.4%_11.2%)] font-medium">
                              {event.event_type}
                            </span>
                          </div>
                          
                          <!-- Event Title -->
                          <h3 class="text-xl font-semibold mb-2 text-[hsl(222.2_47.4%_11.2%)]">
                            {event.title}
                          </h3>
                          
                          <!-- Event Description -->
                          {#if event.description}
                            <p class="text-sm text-[hsl(215.4_16.3%_46.9%)] mb-4 line-clamp-3">
                              {event.description}
                            </p>
                          {/if}
                          
                          <!-- Event Details -->
                          <div class="space-y-2 text-sm text-[hsl(215.4_16.3%_46.9%)] mb-4">
                            {#if event.event_date}
                              <div class="flex items-center">
                                <span class="mr-2">📅</span>
                                <span>{new Date(event.event_date).toLocaleDateString()}</span>
                                {#if event.event_date.includes('T')}
                                  <span class="ml-2">{new Date(event.event_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                {/if}
                              </div>
                            {/if}
                            
                            {#if event.location}
                              <div class="flex items-center">
                                <span class="mr-2">📍</span>
                                <span>{event.location}</span>
                              </div>
                            {/if}
                          </div>

                          <!-- Reminder Section -->
                          <div class="mt-auto">
                            {#if hasReminder(event.id)}
                              <div class="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                                <p class="text-sm text-green-200">✅ Reminder Set</p>
                              </div>
                            {:else}
                              <div class="space-y-3">
                                <label for="reminder-{event.id}" class="block text-sm font-medium text-[hsl(222.2_47.4%_11.2%)]">
                                  Set Reminder
                                </label>
                                <input
                                  id="reminder-{event.id}"
                                  type="datetime-local"
                                  class="w-full px-3 py-2 text-sm border border-[hsl(214.3_31.8%_91.4%)] rounded-md bg-white text-[hsl(222.2_47.4%_11.2%)] focus:outline-none focus:ring-2 focus:ring-[hsl(222.2_47.4%_11.2%)]"
                                  min={new Date().toISOString().slice(0, 16)}
                                />
                                <button
                                  onclick={() => {
                                    const input = document.getElementById(`reminder-${event.id}`) as HTMLInputElement;
                                    setReminder(event.id, input.value);
                                  }}
                                  disabled={loading}
                                  class="w-full px-4 py-2 text-sm font-medium text-white bg-[hsl(222.2_47.4%_11.2%)] border border-[hsl(214.3_31.8%_91.4%)] rounded-md hover:bg-[hsl(222.2_47.4%_11.2%)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {loading ? 'Setting...' : 'Notify Me'}
                                </button>
                              </div>
                            {/if}
                          </div>
                        </div>
                      </Card.Content>
                    </Card.Root>
                  </div>
                </Carousel.Item>
              {/each}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        </div>
      </div>
    {:else}
      <div class="text-center py-12">
        <h2 class="text-2xl font-semibold mb-4">No Events Available</h2>
        <p class="text-[hsl(215.4_16.3%_46.9%)]">Check back later for upcoming events!</p>
      </div>
    {/if}
    
    <!-- Other myspace content can go here -->
  </div>
</div>