// import { supabase } from '$lib/db/supabase'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import type { LayoutServerLoad } from './$types'

export const load = (async (event) => {
	const session = await getServerSession(event)
	return {
        user: session?.user || null,
        session: session || null,
        email: session?.user?.email || null,
        // isAdmin: session?.user?.role === 'admin' || false
    }
}) satisfies LayoutServerLoad
