import Slider from "./slider.svelte";
import SliderComponent from "./slider-component.svelte";

export type SliderProps = {
  minValue: number;
  maxValue: number;
};

export type SliderComponentProps = {
  start: number;
  end: number;
};

export { Slider, SliderComponent };