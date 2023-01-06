import { writable, type Writable } from "svelte/store";
import { supabase } from "$lib/db/supabase";

export const user: Writable<{id: string, email: string}> = writable();
export const session: Writable<{id: string, email: string}> = writable();
export const isAdmin = writable(false);

export const profile = writable()

export const loadProfiles = async () => {
  const { data, error } = await supabase.from('profile').select()
  if (error) return console.error('loadProfile: ', error)
  profile.set(data)
}