import { fail, redirect, type Actions } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { registrating } from '$lib/stores/states'
import { RegisterUserSchema } from '$lib/validationSchema'

export const actions: Actions = {
  signUp: async (event) => {
    const { request } = event
    const { supabaseClient } = await getSupabase(event)
    const formData: any = Object.fromEntries(await request.formData())

    const email = formData.email
    const password = formData.password
    const confirmPassword = formData.confirmPassword

    if (password != confirmPassword) {
      return fail(400, {
        error: true,
        message: 'Invalid form\nCheck the fields',
        data: formData,
        errors: { passwordNotMatching: true },
      })
    }

    // Form Validation
    try {
      RegisterUserSchema.parse({
        email,
        password,
        confirmPassword,
      })
    } catch (err: any) {
      const { fieldErrors: errors } = err.flatten()
      return fail(400, {
        error: true,
        message: 'Invalid form\nCheck the fields',
        data: formData,
        errors,
      })
    }

    try {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      console.error('erreur!!! : ' + error)
      return fail(400, {
        error: true,
        message: "Couldn't register new user",
        data: formData,
      })
    }
    
    // await registrating.set({ status: true, email: email })
    // console.log('REGISTRATING STATUS: ' + JSON.stringify(registrating));
    

    throw redirect(303, '/verification')
  },
}