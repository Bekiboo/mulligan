import { fail, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { AuthUserSchema } from '$lib/validationSchema'
import { ForgotPasswordSchema } from '$lib/validationSchema'
import type { Actions } from './$types'

export const actions: Actions = {
	signIn: async (event) => {
		const { request } = event
		const { supabaseClient } = await getSupabase(event)
		const formData: any = Object.fromEntries(await request.formData())
		const { email } = formData
		const { password } = formData

		// Form Validation
		try {
			AuthUserSchema.parse({ email, password })
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten()
			return fail(400, {
				error: true,
				message: 'Invalid form\nCheck the fields',
				data: formData,
				errors
			})
		}

		const { data, error }: { data: any, error: any } = await supabaseClient.auth.signInWithPassword({
			email,
			password
		})

		console.log(data);
		console.log(error);
		
		

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

	signOut: async (event) => {
		const { supabaseClient } = await getSupabase(event)
		await supabaseClient.auth.signOut()
		throw redirect(303, '/signin')
	},

	resetPassword: async (event) => {
		const { request, url } = event
		const { supabaseClient } = await getSupabase(event)
		const formData: any = Object.fromEntries(await request.formData())
		const { email } = formData

		try {
			ForgotPasswordSchema.parse({ email })
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

		const { error }: { error: any } = await supabaseClient.auth.resetPasswordForEmail(email, {
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
