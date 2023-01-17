import { readable, writable } from 'svelte/store'

export const loadingState = writable(false)
// TODO: fix type
export const registrating: any = writable({ status: false, email: '' })  
export const adminMode = writable(false)
export const devicePixelRatio = readable(1, (set) => {
    set(window.devicePixelRatio)
    const interval = setInterval(() => {
        set(window.devicePixelRatio)
    }, 200)
    return () => clearInterval(interval)
})