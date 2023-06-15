import { fail, type Actions } from '@sveltejs/kit'
import { CreateGameSchema } from '$lib/validationSchema'
import { genRandomString } from '$lib/utils'
import { ZodError } from 'zod'

export const actions: Actions = {
	createGame: async ({ request, locals: { supabase, getSession } }) => {
		const formData = Object.fromEntries(await request.formData())
		const { name } = formData

		const session = await getSession()

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

		const user = supabase.auth.getUser()

		await supabase.from('game').insert([
			{
				owner: (await user)?.data?.user?.id,
				name,
				slug: genRandomString(9)
			}
		])

		// Ca ne marche pas comme il faut
		// Ca récupère les games sans celle qui vient d'être créée

		const { data, error } = await supabase.from('game').select('*').eq('owner', session?.user.id)

		if (error) {
			console.log('Error loading Games: ' + error)
		}
		return {
			user: session?.user || null, //TODO: null needed?
			games: data
		}
	},

	updateGameName: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData())
		const { name, slug } = formData

		console.log('slug', slug)
		console.log('name', name)
		// console.log('user', user)

		// validation Zod
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

		// const user = supabase.auth.getUser()

		const { error } = await supabase.from('game').update({ name }).eq('slug', slug)
	}
}
