import { fail, redirect, type Actions } from '@sveltejs/kit'
import { AuthUserSchema } from '$lib/validationSchema'
import { ForgotPasswordSchema } from '$lib/validationSchema'
import { ZodError } from 'zod'
import type { AuthError, AuthResponse } from '@supabase/supabase-js'

export const actions: Actions = {
	signIn: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData())
		const { email, password } = formData as { email: string; password: string }

		// Form Validation
		try {
			AuthUserSchema.parse({ email, password })
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

		const { error }: AuthResponse = await supabase.auth.signInWithPassword({
			email,
			password
		})

		if (error) {
			if (error && error.status === 400) {
				return fail(400, {
					error: true,
					message: 'Invalid credentials',
					values: {
						email
					}
				})
			}
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			})
		}

		throw redirect(303, '/profile')
	},

	signOut: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut()
		throw redirect(303, '/signin')
	},

	resetPassword: async ({ request, locals: { supabase }, url }) => {
		const formData = Object.fromEntries(await request.formData())
		const { email } = formData as { email: string }

		try {
			ForgotPasswordSchema.parse({ email })
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

		const { error }: { data: object; error: null } | { data: null; error: AuthError } =
			await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${url.origin}/account/update-password`
			})

		if (error) {
			if (error && error.status === 400) {
				return fail(400, {
					error: true,
					message: 'prout',
					values: {
						email
					},
					errors: error
				})
			}
			return fail(500, {
				error: 'Server error. Try again later.',
				message: error.message,
				values: {
					email
				}
			})
		}
	}
}
