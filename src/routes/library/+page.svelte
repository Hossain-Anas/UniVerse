<script lang="ts">
  // Main library page
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold">Library</h1>
  </div>
  
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <a href="/library/books" class="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
      <h2 class="text-xl font-semibold mb-2">Books</h2>
      <p class="text-muted-foreground">Browse and search library books</p>
    </a>
    
    <div class="block p-6 bg-card rounded-lg border opacity-50">
      <h2 class="text-xl font-semibold mb-2">Reservations</h2>
      <p class="text-muted-foreground">View your active reservations</p>
    </div>
    
    <div class="block p-6 bg-card rounded-lg border opacity-50">
      <h2 class="text-xl font-semibold mb-2">Borrowings</h2>
      <p class="text-muted-foreground">Check your borrowed books</p>
    </div>
  </div>
</div>
