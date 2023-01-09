// import { supabase } from '$lib/db/supabase'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async (event) => {
	const session = await getServerSession(event)

	return {
        user: session?.user || null,
        session: session || null,
        email: session?.user?.email || null,
    }
}) satisfies LayoutServerLoad
