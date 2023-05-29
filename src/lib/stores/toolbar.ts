import { writable, type Writable } from 'svelte/store'

export const circleMenu: Writable<boolean> = writable(false)
export const tokenTool: Writable<boolean> = writable(false)
export const cardTool: Writable<boolean> = writable(false)
