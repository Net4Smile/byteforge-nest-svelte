<script lang="ts">
  import * as ShadcnCard from "$lib/components/ui/card";
  import type { CardProps } from "./index";

  let {
    productName,
    productPrice,
    productDesc,
    productImg,
    buttonText,
    productId,
  }: CardProps = $props();
</script>

<ShadcnCard.Root class="mx-auto w-full">
  <a href="/product/{productId}">
    <ShadcnCard.Header class="p-2">
      <div class="flex justify-center rounded-md overflow-clip h-36">
        <img
          src={productImg.src}
          alt={productImg.alt}
          class="h-full grow object-cover"
        />
      </div>
      <ShadcnCard.Title>{productName}</ShadcnCard.Title>
      <ShadcnCard.Description>{productDesc}</ShadcnCard.Description>
    </ShadcnCard.Header>
    <ShadcnCard.Content class="p-2">{productPrice}</ShadcnCard.Content>
  </a>
  <ShadcnCard.Footer class="p-2">
    <button
      aria-label={buttonText ?? "Add to cart"}
      class="w-full py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-400 transition-colors"
    >
      {buttonText ?? "Add to cart"}
    </button>
  </ShadcnCard.Footer>
</ShadcnCard.Root>
