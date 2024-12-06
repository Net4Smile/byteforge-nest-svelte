<script lang="ts">
  import { createLink } from "$lib/utils/links";
  import { categoryData } from "$lib/stores/shared.svelte";
  import type { NavCategoryProps } from "../index";

  let { id, category, subcategories }: NavCategoryProps = $props();

  const handleDropdown = () => {
    $categoryData.open = !$categoryData.open;
    $categoryData.id = id;
  };
</script>

{#if $categoryData.open && $categoryData.id === id}
  <div class="relative flex flex-col items-center w-full">
    <div
      class="w-full flex flex-col justify-between items-center cursor-pointer h-full relative transition-all"
    >
      {#each subcategories as subcategory}
        <a
          href={createLink("categories", category.name, subcategory.name)}
          data-id={subcategory.id}
          class="px-3 py-3 text-left w-full hover:bg-gray-100 transition-colors"
        >
          {subcategory}
        </a>
      {/each}
    </div>
  </div>
{:else if !$categoryData.open}
  <div class="relative flex flex-col items-center w-full">
    <button
      onclick={handleDropdown}
      class="w-full flex items-center cursor-pointer gap-1 px-3 py-3 h-full relative transition-all hover:bg-gray-100"
      data-id={category.id}
    >
      {category} <span class="text-sm">&rarr;</span>
    </button>
  </div>
{/if}
