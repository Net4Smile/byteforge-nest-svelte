<script lang="ts">
  import { categoryData } from "$lib/stores/shared.svelte";

  type $$Props = {
    id: number | string;
    category: string;
    subcategories: string[];
  };

  let { id, category, subcategories }: $$Props = $props();
</script>

{#if $categoryData.open && $categoryData.id === id}
  <div class="relative flex flex-col items-center w-full">
    <div
      class="w-full flex flex-col justify-between items-center cursor-pointer h-full relative transition-all"
    >
      {#each subcategories as subcategory}
        <button
          class="px-3 py-3 text-left w-full hover:bg-gray-100 transition-colors"
        >
          {subcategory}
        </button>
      {/each}
    </div>
  </div>
{:else if !$categoryData.open}
  <div class="relative flex flex-col items-center w-full">
    <button
      onclick={() => {
        $categoryData.open = !$categoryData.open;
        $categoryData.id = id;
      }}
      class="w-full flex items-center cursor-pointer gap-1 px-3 py-3 h-full relative transition-all hover:bg-gray-100"
    >
      {category} <span class="text-sm">&rarr;</span>
    </button>
  </div>
{/if}
