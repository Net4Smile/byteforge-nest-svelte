<script lang="ts">
  import { categoryData } from "$lib/stores/shared.svelte";
  import { createLink } from "$lib/utils/links";
  import { cn } from "$lib/utils/utils";
  import type { NavCategoryProps } from "../index";

  let { id, category }: NavCategoryProps = $props();

  function openDropdown() {
    $categoryData.open = true;
    $categoryData.id = id;
  }

  function closeDropdown() {
    $categoryData.open = false;
    $categoryData.id = null;
  }

  const isDropdownOpen = $derived(
    $categoryData.open && $categoryData.id === id
  );
</script>

<div class="relative">
  <button
    class={cn(
      "w-auto flex justify-between items-center gap-0.5 cursor-pointer same-color px-3 py-2 hover:rounded-t-lg h-full relative shadow-none",
      { "shadow-lg": isDropdownOpen }
    )}
    onmouseenter={openDropdown}
    onmouseleave={closeDropdown}
  >
    <a
      href={createLink("categories", category.name)}
      data-sveltekit-preload-data
      data-id={category.id}
    >
      {category.name} <span class="text-sm">&darr;</span>
    </a>
  </button>
  <button
    class={cn(
      "same-color w-fit min-w-full text-nowrap absolute transition-[max-height] shadow-lg overflow-hidden rounded-b-lg top-full left-0 max-h-0",
      { "max-h-fit": isDropdownOpen }
    )}
    onmouseenter={openDropdown}
    onmouseleave={closeDropdown}
  >
    {#each category.subcategories as subcategory}
      <a
        href={createLink("categories", category.name, subcategory.name)}
        data-id={subcategory.id}
        data-sveltekit-preload-data
        class="py-2 pr-4 pl-2 text-left hover:bg-gray-100 block"
      >
        {subcategory.name}
      </a>
    {/each}
  </button>
</div>

<style lang="postcss">
  .same-color {
    @apply bg-white;
  }
</style>
