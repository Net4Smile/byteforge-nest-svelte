<script lang="ts">
  import BackArrowShape from "$lib/components/svg/back-arrow-shape.svelte";
  import { categoryData } from "$lib/stores/shared.svelte";
</script>

<button
  onclick={() => {
    $categoryData.open = !$categoryData.open;
    $categoryData.id = 0;
  }}
  class="w-full h-10 flex items-center justify-start px-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
>
  <BackArrowShape />
  Back
</button>
