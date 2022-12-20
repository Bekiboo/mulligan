import { writable, type Writable } from 'svelte/store';

export const addToken: Writable<boolean> = writable(false);