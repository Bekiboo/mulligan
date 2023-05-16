import type { BrdElem } from '$lib/types'
import { writable, type Writable } from 'svelte/store'

export const brdElemList: Writable<BrdElem[]> = writable([])
export const selectedBrdElems: Writable<BrdElem[]> = writable([])
