<script lang="ts">
  import Card from "$lib/components/product-card";
  import { websiteName } from "$lib/stores/shared.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Home Page - {websiteName}</title>
</svelte:head>

<main class="w-full">
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-3">
    {#await data.products}
      <p class="text-center w-full">Loading...</p>
    {:then productData}
      {@const data = productData.data.getProducts}
      {#each data as product}
        <Card
          productId={product.id}
          productDesc={product.description}
          productImg={product.image[0]}
          productName={product.name}
          productPrice={product.price}
        />
      {/each}
    {/await}
  </div>
</main>
