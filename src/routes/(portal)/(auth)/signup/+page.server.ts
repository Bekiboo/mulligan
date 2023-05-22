import { fail, redirect, type Actions } from '@sveltejs/kit'
import { RegisterUserSchema } from '$lib/validationSchema'
import { ZodError } from 'zod'

export const actions: Actions = {
	signUp: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData())
		const { email, password, confirmPassword } = formData as {
			email: string
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

		// Form Validation
		try {
			RegisterUserSchema.parse({
				email,
				password,
				confirmPassword
			})
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
			const { error } = await supabase.auth.signUp({
				email,
				password
			})
			if (error) throw error
		} catch (error) {
			console.error('erreur!!! : ' + error)
			return fail(400, {
				error: true,
				message: "Couldn't register new user",
				data: formData
			})
		}

		throw redirect(303, '/verification')
	}
}
