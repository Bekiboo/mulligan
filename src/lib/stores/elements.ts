import { writable, type Writable } from 'svelte/store';
import type { Element } from '../types';

export const elementList: Writable<Element[]> = writable([]);