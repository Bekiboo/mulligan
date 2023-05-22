import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ params, locals: { getSession } }) => {
	const session = await getSession()

	if (!session && params.slug !== 'demo') {
		throw redirect(303, '/signin')
	}

	return {
		user: session?.user || null,
		session: session || null,
		email: session?.user?.email || null
	}
}
