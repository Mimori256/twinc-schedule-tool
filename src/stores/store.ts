import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const dateSelectorValues: Writable<any> = writable(null);
export const holidayValues: Writable<string[]> = writable([]);
