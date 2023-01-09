// import { supabase } from '$lib/db/supabase'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async (event) => {
	const session = await getServerSession(event)

	if (!session) {
        console.log('no session');
        
		throw redirect(302, '/signin')
	}
}) satisfies LayoutServerLoad
