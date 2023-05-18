import { fail } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { CreateGameSchema } from '$lib/validationSchema'
import type { Actions } from './$types'
import { genRandomString } from '$lib/utils'
import { ZodError } from 'zod'

export const actions: Actions = {
	createGame: async (event) => {
		const { request } = event
		const { supabaseClient } = await getSupabase(event)
		const formData = Object.fromEntries(await request.formData())
		const { name } = formData

		try {
			CreateGameSchema.parse({ name })
		} catch (err: unknown) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten()
				return fail(400, {
					error: true,
					message: 'Invalid form\nCheck the fields',
					data: formData,
					errors
				})
			}
		}

		const user = supabaseClient.auth.getUser()

		await supabaseClient.from('game').insert([
			{
				owner: (await user)?.data?.user?.id,
				name,
				slug: genRandomString(9)
			}
		])
	}
}
