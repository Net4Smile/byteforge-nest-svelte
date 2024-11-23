<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import { websiteName } from "$lib/stores/shared.svelte";
</script>

<svelte:head>
  <title>Home Page - {websiteName}</title>
</svelte:head>

<main>
  <Hero />
</main>
