import { writable } from 'svelte/store'

export const loadingState = writable(false)
export const registrating = writable({ status: false, email: '' })
export const adminMode = writable(false)
export const zoom = writable(1)
export const movingBrdElem = writable()
export const game = writable()
export const dragging = writable(false)
export const clickStartPos = writable<{ x: number; y: number }>({ x: 0, y: 0 })
export const hoveringTrash = writable(false)
