<script lang="ts">
  import { websiteName } from "$lib/stores/shared.svelte";
  import { normalizeLink } from "$lib/utils/links";
  import Card from "$lib/components/product-card";

  let { data } = $props();

  const { category, subcategory } = $derived(data);

  const [normalizedCategory, normalizedSubcategory] = $derived(
    normalizeLink(category, subcategory)
  );
</script>

<svelte:head>
  <title>{normalizedCategory} - {websiteName}</title>
</svelte:head>

<main class="w-full">
  <h2>{normalizedCategory} {normalizedSubcategory}</h2>
  <!-- <p>{normalizedCategory}</p>
  <p>{normalizedSubcategory}</p> -->
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-3">
    {#each Array(10) as _}
      <Card
        productId={"0"}
        productDesc="This is a product description"
        productImg={{ src: "" }}
        productName="This is a product name"
        productPrice="This is a product price"
      />
    {/each}
  </div>
</main>
