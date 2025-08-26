<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
  <title>UniVerse - Your Complete Student Platform</title>
  <meta name="description" content="Welcome to UniVerse, your all-in-one student platform featuring library, café, marketplace, and more" />
</svelte:head>

<!-- Hero Section -->
<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative overflow-hidden">
  <!-- Animated Gradient Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 animate-pulse"></div>
  <div class="absolute inset-0 bg-gradient-to-tl from-black via-gray-800/30 to-black animate-pulse delay-1000"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/10 to-transparent animate-pulse delay-2000"></div>
  <!-- Navigation -->
  <nav class="relative z-10 flex items-center justify-between p-8">
    <a href="/" class="text-white font-extrabold leading-tight hover:opacity-80 transition-opacity">
      UNI<br/>VERSE
    </a>
    
    <div class="hidden md:flex items-center space-x-8">
      <a href="#features" class="text-gray-400 hover:text-white transition-colors">Features</a>
      <a href="#about" class="text-gray-400 hover:text-white transition-colors">About</a>
      <Button href="/auth/login" variant="ghost" class="text-white hover:bg-white/10">
        Sign In
      </Button>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="relative z-10 flex-1 flex items-center justify-center px-8">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Main Heading -->
             <h1 class="text-6xl md:text-8xl font-bold mb-8 leading-tight">
         Your Complete Student
         <span class="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
           UNIVERSE
         </span>
       </h1>
      
      <!-- Description -->
      <p class="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
        All-in-one student platform featuring library, café, marketplace, and more. 
        Everything you need for your academic journey in one place.
      </p>

             <!-- CTA Button -->
       <div class="flex justify-center">
         <Button 
           href="/auth/login" 
           size="lg"
           class="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
         >
           Get Started
         </Button>
       </div>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <div class="relative z-10 flex justify-center pb-8">
    <div class="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
      <div class="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
    </div>
  </div>
</div>

<!-- Features Section -->
<section id="features" class="py-24 bg-gray-900">
  <div class="max-w-6xl mx-auto px-8">
    <div class="text-center mb-20">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
        Everything You Need
      </h2>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto">
        A comprehensive platform designed for modern student life
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Feature 1 -->
      <div class="group p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300">
        <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">Digital Library</h3>
        <p class="text-gray-400 leading-relaxed">
          Access thousands of books, articles, and educational resources across all subjects.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="group p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300">
        <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">Campus Café</h3>
        <p class="text-gray-400 leading-relaxed">
          Order food, beverages, and snacks from campus cafés with easy payment.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="group p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300">
        <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">Marketplace</h3>
        <p class="text-gray-400 leading-relaxed">
          Buy, sell, and trade textbooks and student essentials with fellow students.
        </p>
      </div>

      <!-- Feature 4 -->
      <div class="group p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300">
        <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">Smart Features</h3>
        <p class="text-gray-400 leading-relaxed">
          Advanced search, notifications, and seamless integration across all services.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="py-24 bg-black">
  <div class="max-w-4xl mx-auto px-8 text-center">
    <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
      Built for Students
    </h2>
    <p class="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
      Universe is more than just a platform. It's a comprehensive student ecosystem designed to empower students with everything they need for their academic journey.
    </p>
  </div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 text-white py-16">
  <div class="max-w-6xl mx-auto px-8">
    <div class="grid md:grid-cols-4 gap-8">
      <div>
        <div class="flex items-center space-x-2 mb-4">
          <span class="font-extrabold text-xl">UNI<br/>VERSE</span>
        </div>
        <p class="text-gray-400">
          Your comprehensive all-in-one student platform.
        </p>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Product</h4>
        <ul class="space-y-2 text-gray-400">
          <li><button class="hover:text-white transition-colors text-left">Features</button></li>
          <li><button class="hover:text-white transition-colors text-left">Library</button></li>
          <li><button class="hover:text-white transition-colors text-left">Café</button></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Company</h4>
        <ul class="space-y-2 text-gray-400">
          <li><button class="hover:text-white transition-colors text-left">About</button></li>
          <li><button class="hover:text-white transition-colors text-left">Contact</button></li>
          <li><button class="hover:text-white transition-colors text-left">Support</button></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Legal</h4>
        <ul class="space-y-2 text-gray-400">
          <li><button class="hover:text-white transition-colors text-left">Privacy</button></li>
          <li><button class="hover:text-white transition-colors text-left">Terms</button></li>
          <li><button class="hover:text-white transition-colors text-left">Cookies</button></li>
        </ul>
      </div>
    </div>
    
    <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
      <p>&copy; 2025 Universe. All rights reserved.</p>
    </div>
  </div>
</footer>


