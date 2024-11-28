<script lang="ts">
  import * as ShadcnCard from "$lib/components/ui/card";
  import type { CardProps } from "./index";

  let {
    productName,
    productPrice,
    productDesc,
    productImg,
    buttonText,
  }: CardProps = $props();
</script>

<ShadcnCard.Root class="w-full max-w-60 mx-auto">
  <ShadcnCard.Header class="p-2">
    <div class="flex justify-center rounded-md overflow-clip">
      <img src={productImg.src} alt={productImg.alt} class="h-full grow" />
    </div>
    <ShadcnCard.Title>{productName}</ShadcnCard.Title>
    <ShadcnCard.Description>{productDesc}</ShadcnCard.Description>
  </ShadcnCard.Header>
  <ShadcnCard.Content class="p-2">{productPrice}</ShadcnCard.Content>
  <ShadcnCard.Footer class="p-2">
    <button
      aria-label={buttonText ?? "Add to cart"}
      class="w-full py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-400 transition-colors"
    >
      {buttonText ?? "Add to cart"}
    </button>
  </ShadcnCard.Footer>
</ShadcnCard.Root>
