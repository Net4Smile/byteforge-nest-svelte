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
    <div class="price-input-container">
      <input
        type="number"
        class="price-input"
        placeholder={"From"}
        min={minPrice}
        max={maxPrice}
        value={priceSlider.inputMinPrice}
        oninput={priceSlider.handleInputChange("min")}
      />
      <span class="price-input-currency">zł</span>
    </div>
    <span class="price-separator">-</span>
    <div class="price-input-container">
      <input
        type="number"
        class="price-input"
        min={minPrice}
        max={maxPrice}
        placeholder={"To"}
        value={priceSlider.inputMaxPrice}
        oninput={priceSlider.handleInputChange("max")}
      />
      <span class="price-input-currency">zł</span>
    </div>
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

  .price-input-container {
    @apply w-20 p-1 border border-gray-300 rounded-[2px] text-sm flex flex-row gap-2;
  }

  .price-input {
    @apply focus-within:outline-none w-4/5;
  }

  .price-input-currency {
    @apply text-gray-500 select-none;
  }
  .price-separator {
    @apply mx-2 text-gray-600;
  }
</style>
