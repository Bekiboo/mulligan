import { supabase } from '$lib/db/supabase'
import type { BrdElem } from '$lib/types'
import type { PageLoad } from './$types'

export const load = (async ({ params }) => {
	const { slug } = params

	const { data, error } = await supabase.from(`element`).select().eq('game_slug', slug)

	const brdElems: BrdElem[] = data as BrdElem[]

	if (error) console.error('Error while loading brdElems: ' + error)

	return {
		game: brdElems,
		slug
	}
}) satisfies PageLoad
