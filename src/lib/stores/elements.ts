// import type { Element } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const draggedElement: any = writable();
export const elementList: any = writable([]);