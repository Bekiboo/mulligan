// import type { Element } from '$lib/types';
import { writable } from 'svelte/store';

export const elementList: any = writable([]);
export const selectedElements: any = writable([]);