<script lang="ts">
	import Navigation from "$lib/components/navigation";
	import { isMobile } from "$lib/stores/shared.svelte";
	import Aside from "$lib/components/aside";
	import "../app.css";
	import "$lib/stringExtensions"
	
  let { data, children } = $props();
	
  $effect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const checkMobile = () => ($isMobile = mediaQuery.matches);

    checkMobile();
    mediaQuery.addEventListener("change", checkMobile);

    return () => mediaQuery.removeEventListener("change", checkMobile);
  });
</script>

<Navigation categories={data.categories.data.getCategories} />
<main class="wrapper">
  <Aside />
	<section class="w-full flex items-center justify-center gap-2">
		{@render children()}
	</section>
</main>

<style lang="postcss">
  .wrapper {
    @apply flex flex-col md:flex-row gap-2 w-full max-w-screen-2xl mx-auto my-3;
  }
</style>
