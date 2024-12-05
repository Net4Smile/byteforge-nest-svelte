<script lang="ts">
  let { data } = $props();

  const { product } = $derived(data);
</script>

{#await product}
  <p>Loading...</p>
{:then product}
  {@const data = product.data.getProduct}
  {#if !data}
    <div class="flex flex-col items-center gap-4">
      <p>404 Product not found</p>
      <a
        href="/"
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-colors"
        >Return to home page</a
      >
    </div>
  {:else}
    <h1>{data.name}</h1>
    <p>{data.description}</p>
    <p>{data.price}</p>
    <img src={data.image[0].src} alt={data.image[0].alt} />
  {/if}
{/await}
