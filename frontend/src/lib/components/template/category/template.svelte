<script lang="ts">
  import { isMobile } from "$lib/stores/shared.svelte";
  import MobileCategory from "./mobile/template.svelte";
  import DesktopCategory from "./desktop/template.svelte";

  type $$Props = {
    id: number | string;
    category: string;
    subcategories: string[];
  };

  let { id, category, subcategories }: $$Props = $props();

  // TODO: add request via category for products
  // TODO: add request via subcategory for products
</script>

{#if $isMobile}
  <MobileCategory {id} {category} {subcategories} />
{:else}
  <DesktopCategory {id} {category} {subcategories} />
{/if}
