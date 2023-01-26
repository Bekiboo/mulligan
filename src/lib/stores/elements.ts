// import type { Element } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const draggedElements: any = writable([]);
export const elementList: any = writable([]);
export const selectedElements: any = writable([]);