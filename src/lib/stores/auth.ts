import { writable, type Writable } from 'svelte/store'
import type { User } from '$lib/types'

export const user: Writable<User> = writable()
export const session: Writable<{ id: string; email: string }> = writable()
export const isAdmin = writable(false)

export const profile = writable()
