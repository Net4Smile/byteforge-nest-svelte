<script lang="ts">
  import XShape from "$lib/components/svg/x-shape.svelte";
  import { navigationOpen } from "$lib/stores/shared.svelte";
</script>

<button
  onclick={() => {
    $navigationOpen = false;
  }}
  class="w-full h-10 flex items-center justify-end px-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
>
  Close
  <XShape />
</button>
