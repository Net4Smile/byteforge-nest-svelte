<script lang="ts">
  import Price from "./components/price.svelte";
  // TODO: based on category add search by something like brand, color, memory size
</script>

<aside class="aside hidden md:block">
  <h2 class="aside-title">Filters</h2>
  <Price minPrice={0} maxPrice={2500} />
  <!-- Add other filter components here -->
</aside>

<style lang="postcss">
  .aside {
    @apply w-60 p-4 border-r bg-white;
  }

  .aside-title {
    @apply text-lg font-medium mb-4 text-[#333];
  }
</style>
