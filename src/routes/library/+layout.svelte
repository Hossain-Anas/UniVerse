<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
  let { children } = $props();
</script>

<div class="min-h-[100dvh] bg-background text-foreground" style="scrollbar-gutter: stable both-edges;">
<nav class="w-full bg-transparent">
  <div class="w-full flex justify-center">
    <NavigationMenu.Root viewport={false} class="max-w-max">
      <NavigationMenu.List class="flex gap-6 p-4 justify-center">
        <NavigationMenu.Item>
          <NavigationMenu.Link>
            {#snippet child()}
              <a href="/library" class="px-4 py-2 text-sm font-medium hover:text-foreground/90 focus:outline-none">Home</a>
            {/snippet}
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link>
            {#snippet child()}
              <a href="/library/books" class="px-4 py-2 text-sm font-medium hover:text-foreground/90 focus:outline-none">Books</a>
            {/snippet}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
</nav>

<main>
  {@render children?.()}
</main>
</div>
