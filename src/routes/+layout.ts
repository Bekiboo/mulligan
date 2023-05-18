import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { LoadEvent } from '@sveltejs/kit'

// In addition you can create a layout load function if you are using
// invalidate('supabase:auth'):
export const load = async (event: LoadEvent) => {
	const { session } = await getSupabase(event)
	return { session }
}
