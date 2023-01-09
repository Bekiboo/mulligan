import { registrating } from '$lib/stores/states'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async () => {

	console.log('status: ' + registrating.status)
	console.log('email: ' + registrating.email)
	// if (registrating.status != true) {
	// 	throw error(404)
	// }

	// return { email: registrating.email }
}) satisfies PageServerLoad
