<script lang="ts">
  import { isMobile } from "$lib/stores/shared.svelte";
  import MobileCategory from "./mobile/template.svelte";
  import DesktopCategory from "./desktop/template.svelte";
  import type { NavCategoryProps } from "./index";

  let { ...props }: NavCategoryProps = $props();

  // TODO: add request via category for products
  // TODO: add request via subcategory for products
</script>

{#if $isMobile}
  <MobileCategory {...props} />
{:else}
  <DesktopCategory {...props} />
{/if}
