import { fail } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { CreateGameSchema } from '$lib/validationSchema'
import type { Actions } from './$types'
import { genRandomString } from '$lib/utils'

export const actions: Actions = {
	createGame: async (event) => {
		const { request } = event
		const { supabaseClient } = await getSupabase(event)
		const formData = Object.fromEntries(await request.formData())
		const { name } = formData

		try {
			CreateGameSchema.parse({ name })
		} catch (err: any) {
			console.log(err)
			const { fieldErrors: errors } = err.flatten()
			return fail(400, {
				error: true,
				message: 'Invalid form\nCheck the fields',
				data: formData,
				errors
			})
		}

		const user = supabaseClient.auth.getUser()

		const { data, error }: { data: any; error: any } = await supabaseClient.from('game').insert([
			{
				owner: (await user)?.data?.user?.id,
				name,
				slug: genRandomString(9)
			}
		])

		// const { error }: { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
		// 	redirectTo: `${url.origin}/account/update-password`
		// })

		// if (error) {
		// 	if (error && error.status === 400) {
		// 		return fail(400, {
		// 			error: true,
		// 			message: 'prout',
		// 			values: {
		// 				email
		// 			},
		// 			errors: error
		// 		})
		// 	}
		// 	return fail(500, {
		// 		error: 'Server error. Try again later.',
		// 		message: error.message,
		// 		values: {
		// 			email
		// 		}
		// 	})
		// }
	}
}
