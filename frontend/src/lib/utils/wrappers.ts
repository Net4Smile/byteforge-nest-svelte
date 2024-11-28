export function once<T, E extends Event>(fn: ((event: E) => void) | null) {
  return function (this: T, event: E) {
    if (fn) fn.call(this, event);
    fn = null;
  }
}

export function preventDefault<T, E extends Event>(fn: (event: E) => void) {
  return function (this: T, event: E) {
    event.preventDefault();
    fn.call(this, event);
  };
}

export function preventPropagation<T, E extends Event>(fn: (event: E) => void) {
  return function (this: T, event: E) {
    event.stopPropagation();
    fn.call(this, event);
  }
}	