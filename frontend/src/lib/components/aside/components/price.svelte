<script lang="ts">
  import { SliderComponent, Slider } from "../../slider";

  type $Props = {
    minPrice: number;
    maxPrice: number;
  };

  let { minPrice, maxPrice }: $Props = $props();

  let priceSlider = new Slider({
    minValue: minPrice,
    maxValue: maxPrice,
  });
</script>

<div class="price-filter">
  <h3 class="price-filter-title">Price Range</h3>
  <div class="price-inputs">
    <input
      type="number"
      class="price-input"
      placeholder={minPrice.toString()}
      min={minPrice}
      max={maxPrice}
      value={priceSlider.inputMinPrice}
      oninput={priceSlider.handleInputChange("min")}
    />
    <span class="price-separator">-</span>
    <input
      type="number"
      class="price-input"
      min={minPrice}
      max={maxPrice}
      placeholder={maxPrice.toString()}
      value={priceSlider.inputMaxPrice}
      oninput={priceSlider.handleInputChange("max")}
    />
  </div>

  <SliderComponent
    bind:start={priceSlider.sliderStart}
    bind:end={priceSlider.sliderEnd}
  />
</div>

<style lang="postcss">
  .price-filter {
    @apply mb-6;
  }

  .price-filter-title {
    @apply text-base font-medium mb-2 text-gray-800;
  }

  .price-inputs {
    @apply flex items-center mb-2 justify-center;
  }

  .price-input {
    @apply w-20 p-1 border border-gray-300 rounded-[2px] text-sm;
  }

  .price-separator {
    @apply mx-2 text-gray-600;
  }
</style>
