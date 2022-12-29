import { writable, type Writable } from 'svelte/store';

export const tokenTool: Writable<boolean> = writable(false);