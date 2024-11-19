<script lang="ts">
  import { isMobile, categoryData } from "$lib/stores/shared";

  type $$Props = {
    id: number | string;
    category: string;
    subcategories: string[];
  };

  let { id, category, subcategories }: $$Props = $props();

  function handleMouseEnter() {
    if (!$isMobile) {
      $categoryData.open = true;
      $categoryData.id = id;
    }
  }

  function handleMouseLeave() {
    if (!$isMobile) {
      $categoryData.open = false;
      $categoryData.id = null;
    }
  }

  const useClass = $derived($categoryData.open && $categoryData.id === id);
  const dontUseClass = $derived(!$categoryData.open || $categoryData.id !== id);

  // TODO: add request via category for products
  // TODO: add request via subcategory for products
</script>

{#if $isMobile}
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
{:else}
  <div class="relative">
    <button
      class="w-auto flex justify-between items-center gap-0.5 cursor-pointer same-color px-3 py-2 hover:rounded-t-lg h-full relative"
      class:shadow-none={dontUseClass}
      class:shadow-lg={useClass}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
    >
      {category} <span class="text-sm">&darr;</span>
    </button>
    <button
      class="same-color w-fit text-nowrap absolute transition-[max-height] shadow-lg overflow-hidden rounded-b-lg top-full left-0"
      class:max-h-0={dontUseClass}
      class:max-h-fit={useClass}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
    >
      {#each subcategories as subcategory}
        <div class="py-2 pr-4 pl-2 text-left hover:bg-gray-100">
          {subcategory}
        </div>
      {/each}
    </button>
  </div>
{/if}

<style lang="postcss">
  .same-color {
    @apply bg-white;
  }
</style>
