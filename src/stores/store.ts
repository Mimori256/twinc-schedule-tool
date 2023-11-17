import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { RescheduleData } from "../types/RescheduleData";

export const dateSelectorValues: Writable<any> = writable({});
export const holidayValues: Writable<string[]> = writable([]);
export const rescheduleSelectorValues: Writable<RescheduleData[]> = writable(
  []
);
export const deadlineValues: Writable<string[]> = writable([]);
