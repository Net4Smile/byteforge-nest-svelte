<script lang="ts">
  import { categoryData } from "$lib/stores/shared.svelte";
  import { createLink } from "$lib/utils";

  type $$Props = {
    id: number | string;
    category: string;
    subcategories: string[];
  };

  let { id, category, subcategories }: $$Props = $props();

  function handleMouseEnter() {
    $categoryData.open = true;
    $categoryData.id = id;
  }

  function handleMouseLeave() {
    $categoryData.open = false;
    $categoryData.id = null;
  }

  const useClass = $derived($categoryData.open && $categoryData.id === id);
  const dontUseClass = $derived(!$categoryData.open || $categoryData.id !== id);
</script>

<div class="relative">
  <button
    class="w-auto flex justify-between items-center gap-0.5 cursor-pointer same-color px-3 py-2 hover:rounded-t-lg h-full relative"
    class:shadow-none={dontUseClass}
    class:shadow-lg={useClass}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
  >
    <a data-sveltekit-replacestate href={createLink(category)}>
      {category} <span class="text-sm">&darr;</span>
    </a>
  </button>
  <button
    class="same-color w-fit text-nowrap absolute transition-[max-height] shadow-lg overflow-hidden rounded-b-lg top-full left-0"
    class:max-h-0={dontUseClass}
    class:max-h-fit={useClass}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
  >
    {#each subcategories as subcategory}
      <a
        data-sveltekit-replacestate
        href={createLink(category, subcategory)}
        class="py-2 pr-4 pl-2 text-left hover:bg-gray-100 block"
      >
        {subcategory}
      </a>
    {/each}
  </button>
</div>

<style lang="postcss">
  .same-color {
    @apply bg-white;
  }
</style>
