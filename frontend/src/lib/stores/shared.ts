import { writable } from "svelte/store";

export const navigationOpen = writable(false);
export const categoryData = writable<{ open: boolean; id: number | string | null }>({ open: false, id: null });
export const isMobile = writable(false);