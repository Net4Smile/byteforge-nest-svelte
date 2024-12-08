<script lang="ts">
  import { websiteName } from "$lib/stores/shared.svelte";
  import { normalizeLink } from "$lib/utils/links";
  import Card from "$lib/components/product-card";

  let { data } = $props();

  const { category, subcategory, products } = $derived(data);

  const [normalizedCategory, normalizedSubcategory] = $derived(
    normalizeLink(category, subcategory)
  );
</script>

<svelte:head>
  <title>{normalizedCategory} - {websiteName}</title>
</svelte:head>

<main class="w-full">
  <!-- <h2>{normalizedCategory} {normalizedSubcategory}</h2> -->
  <!-- <p>{normalizedCategory}</p>
  <p>{normalizedSubcategory}</p> -->
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-3">
    {#await products}
      <p class="text-center w-full">Loading...</p>
    {:then products}
      {#each products.data.getProducts as product}
        <Card
          productId={product.id}
          productDesc={product.description}
          productImg={{
            src: product.image[0].src,
            alt: product.image[0].alt,
            id: product.image[0].id,
            productId: product.id,
          }}
          productName={product.name}
          productPrice={product.price}
        />
      {/each}
    {/await}
  </div>
</main>
