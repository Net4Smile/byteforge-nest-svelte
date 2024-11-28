import { clamp } from "$lib/utils/utils";
import type { SliderProps } from "./index";

export default class Slider {
  minValue: number;
  maxValue: number;
  public sliderStart = $state(0);
  public sliderEnd = $state(1);
  public inputMinPrice = $derived(this.calculateInputValue('min'));
  public inputMaxPrice = $derived(this.calculateInputValue('max'));

  constructor({ minValue, maxValue }: SliderProps) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  private calculateInputValue(which: 'min' | 'max') {
    const sliderValue = which === 'min' ? this.sliderStart : this.sliderEnd;
    return Math.round(this.minValue + sliderValue * (this.maxValue - this.minValue));
  }

  public handleInputChange(which: "min" | "max") {
    return (event: Event) => {
      const value = parseFloat((event.target as HTMLInputElement).value);
      if (isNaN(value)) return;

      if (which === "min") {
        this.sliderStart = clamp(
          (value - this.minValue) / (this.maxValue - this.minValue),
          0,
          this.sliderEnd
        );
      } else {
        this.sliderEnd = clamp(
          (value - this.minValue) / (this.maxValue - this.minValue),
          this.sliderStart,
          1
        );
      }
    };
  }

}
