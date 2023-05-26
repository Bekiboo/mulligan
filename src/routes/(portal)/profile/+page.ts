import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
	const { supabase, session } = await parent()

	const { data, error } = await supabase.from('game').select('*').eq('owner', session?.user.id)

	if (error) {
		console.log('Error loading Games: ' + error)
	}
	return {
		user: session?.user || null, //TODO: null needed?
		games: data
	}
}
