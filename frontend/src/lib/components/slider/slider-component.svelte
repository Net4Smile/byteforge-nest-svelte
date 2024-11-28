<script lang="ts">
  import { preventDefault, preventPropagation } from "$lib/utils/wrappers";
  import { draggable } from "$lib/utils/draggable";
  import type { SliderComponentProps } from ".";

  let { start = $bindable(), end = $bindable() }: SliderComponentProps =
    $props();

  let slider: HTMLDivElement;
  let handleStart: HTMLDivElement;
  let draggingHandle: "start" | "end" | null = $state(null);

  const MIN_HANDLE_OFFSET = 0.03;

  function setHandlePosition(which: "start" | "end") {
    return function (event: CustomEvent<{ x: number; y: number }>) {
      const { left, right } = slider.getBoundingClientRect();
      const parentWidth = right - left;
      const p = Math.min(Math.max((event.detail.x - left) / parentWidth, 0), 1);
      if (which === "start") {
        start = Math.min(p, end - MIN_HANDLE_OFFSET);
      } else {
        end = Math.max(p, start + MIN_HANDLE_OFFSET);
      }
    };
  }

  function handleDrag(node: HTMLDivElement, which: "start" | "end") {
    const handler = preventDefault(
      preventPropagation(setHandlePosition(which))
    );

    const dragstart = () => {
      draggingHandle = which;
    };

    const dragmove = (event: Event) => {
      if (event instanceof CustomEvent) {
        handler(event);
      }
    };

    const dragend = () => {
      draggingHandle = null;
    };

    node.addEventListener("dragstart", dragstart);
    node.addEventListener("dragmove", dragmove);
    node.addEventListener("dragend", dragend);

    return {
      destroy() {
        node.removeEventListener("dragstart", dragstart);
        node.removeEventListener("dragmove", dragmove);
        node.removeEventListener("dragend", dragend);
      },
    };
  }
</script>

<div class="double-range-container">
  <div class="slider" bind:this={slider}>
    <div
      class="slider-body"
      style="
        left: {100 * start}%;
        right: {100 * (1 - end)}%;
      "
    ></div>
    <div
      class="slider-handle"
      bind:this={handleStart}
      use:draggable
      use:handleDrag={"start"}
      class:dragging={draggingHandle === "start"}
      role="button"
      style="
				left: {100 * start}%;
        z-index: {draggingHandle === 'start' ? 2 : 1};
			"
      data-which="start"
    ></div>
    <div
      class="slider-handle"
      class:dragging={draggingHandle === "end"}
      use:draggable
      use:handleDrag={"end"}
      role="button"
      style="
        left: {100 * end}%;
        z-index: {draggingHandle === 'end' ? 2 : 1};
      "
      data-which="end"
    ></div>
  </div>
</div>

<style>
  .double-range-container {
    width: 100%;
    height: 20px;
    user-select: none;
    box-sizing: border-box;
    white-space: nowrap;
  }

  .slider {
    position: relative;
    width: 100%;
    height: 6px;
    top: 50%;
    transform: translate(0, -50%);
    background-color: #e2e2e2;
    box-shadow:
      inset 0 7px 10px -5px #ffffff,
      inset 0 -1px 0px 0px #e2dbdb;
    border-radius: 1px;
  }

  .slider-handle {
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
  }

  .slider-handle.dragging {
    background-color: #007bff;
    border-color: #0056b3;
  }

  .slider-handle {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border-radius: 50%;
    width: 13px;
    height: 13px;
    background-color: #fdfdfd;
    border: 1px solid #7b7b7b;
    transform: translate(-50%, -50%);
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease;
  }

  .slider-handle[data-which="end"]:after {
    transform: translate(-100%, -50%);
  }

  .slider-handle:active:after {
    background-color: #ddd;
    z-index: 9;
  }

  .slider-body {
    top: 0;
    position: absolute;
    background-color: #34a1ff;
    bottom: 0;
  }
</style>
