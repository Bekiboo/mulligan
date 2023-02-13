import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async (event) => {
	const session = await getServerSession(event)
	const slug = event.params.slug


	if (!session && slug !== 'demo') {
		throw redirect(303, '/signin')
	}

	// return {
	// 	user: session?.user || null,
	// 	session: session || null,
	// 	email: session?.user?.email || null
	// }
}) satisfies LayoutServerLoad