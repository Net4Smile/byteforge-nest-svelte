<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import { isMobile } from "$lib/stores/shared";

  $effect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const checkMobile = () => ($isMobile = mediaQuery.matches);

    checkMobile();
    mediaQuery.addEventListener("change", checkMobile);

    return () => mediaQuery.removeEventListener("change", checkMobile);
  });

  import "./app.css";
</script>

<Navigation />
<main></main>
