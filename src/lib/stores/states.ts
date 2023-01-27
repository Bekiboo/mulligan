import { writable } from 'svelte/store'

export const loadingState = writable(false)
// TODO: fix type
export const registrating = writable({ status: false, email: '' })  
export const adminMode = writable(false)
export const zoom = writable(1)
export const movingElement = writable()
export const game = writable()
export const dragging = writable(false)
export const clickStartPos: any = writable()
export const hoveringTrash = writable(false)