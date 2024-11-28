export function draggable(element: HTMLDivElement) {
  let x: number;
  let y: number;

  function handleMouseDown(event: unknown) {
    if (event instanceof TouchEvent && event.type === "touchstart") {
      event = event.touches[0];
    }

    if (event instanceof MouseEvent) {
      event = event as MouseEvent;
    }

    x = (event as MouseEvent).clientX;
    y = (event as MouseEvent).clientY;

    element.dispatchEvent(
      new CustomEvent("dragstart", {
        detail: { x, y },
      })
    );

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
  }

  function handleMouseMove(event: unknown) {
    if (event instanceof TouchEvent && event.type === "touchmove") {
      event = event.touches[0];
    }

    if (event instanceof MouseEvent) {
      event = event as MouseEvent;
    }

    const dx = (event as MouseEvent).clientX - x;
    const dy = (event as MouseEvent).clientY - y;

    x = (event as MouseEvent).clientX;
    y = (event as MouseEvent).clientY;

    element.dispatchEvent(
      new CustomEvent("dragmove", {
        detail: { x, y, dx, dy },
      })
    );
  }

  function handleMouseUp(event: unknown) {
    x = (event as MouseEvent).clientX;
    y = (event as MouseEvent).clientY;

    element.dispatchEvent(
      new CustomEvent("dragend", {
        detail: { x, y },
      })
    );

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleMouseMove);
    window.removeEventListener("touchend", handleMouseUp);
  }

  element.addEventListener("mousedown", handleMouseDown);
  element.addEventListener("touchstart", handleMouseDown);

  return {
    destroy() {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("touchstart", handleMouseDown);
    },
  };
}