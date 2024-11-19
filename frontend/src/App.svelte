<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import { isMobile, websiteName } from "$lib/stores/shared.svelte";

  $effect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const checkMobile = () => ($isMobile = mediaQuery.matches);

    checkMobile();
    mediaQuery.addEventListener("change", checkMobile);

    return () => mediaQuery.removeEventListener("change", checkMobile);
  });

  import "./app.css";
</script>

<svelte:head>
  <title>Home Page - {websiteName}</title>
</svelte:head>

<Navigation />
<main></main>
