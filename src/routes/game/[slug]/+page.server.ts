import { error } from '@sveltejs/kit'
import { supabase } from '$lib/db/supabase'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const { slug } = params

	// Check if game exists. If not, throw 404 error
	const { count, error: err } = await supabase
		.from('game')
		.select('*', { count: 'exact', head: true })
		.eq('slug', slug)

	if (err) console.error('Error while loading game: ' + err)

	if (count === 0 || count === null || count === undefined) {
		throw error(404, { message: 'Game not found' })
	}

	return {}
}) satisfies PageServerLoad
