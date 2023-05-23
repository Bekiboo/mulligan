import { UpdatePasswordSchema } from '$lib/validationSchema'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { ZodError } from 'zod'
import type { LayoutServerLoad } from '../$types.js'

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	}
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData())
		const { password, confirmPassword } = formData as {
			password: string
			confirmPassword: string
		}

		if (password != confirmPassword) {
			return fail(400, {
				error: true,
				message: 'Invalid form\nCheck the fields',
				data: formData,
				errors: { passwordNotMatching: true }
			})
		}

		try {
			UpdatePasswordSchema.parse({ password, confirmPassword })
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

		try {
			const { error } = await supabase.auth.updateUser({ password })
			if (error) throw error
		} catch (error) {
			console.error('erreur!!! : ' + error)
			return fail(400, {
				error: true,
				message: "Couldn't reset password",
				data: formData
			})
		}

		throw redirect(303, '/signin')
	}
}
