// import type { Element } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const selectedElement: any = writable();
export const elementList: any = writable([]);