<script lang="ts">
  import toast from 'svelte-french-toast'
  import { enhance, applyAction } from '$app/forms'
	import type { ActionResult } from '@sveltejs/kit'
  import { loadingState } from '$lib/stores/states'
	import { user } from '$lib/stores/auth'
  import ForgotPassword from './ForgotPassword.svelte'
  console.log($user);
  
  let errors: any

  const submitForm = () => {
		loadingState.set(true)
		return async ({ result, update }: { result: ActionResult; update: any }) => {
			loadingState.set(false)

      if (result.type === 'failure') {
        errors = result.data?.errors

        toast.error(result.data?.message, {
          duration: 5000,
          style: 'margin-top: 4rem',
        })
        return await applyAction(result)
      }
      errors = []
      toast.success('Welcome to the dashboard!', {
        duration: 2000,
        style: 'margin-top: 4rem',
      })
      update()
    }
  }
</script>

<div class="w-full bg-[#3F589E] rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0">
  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    <h1
      class="text-xl font-bold leading-tight tracking-tight md:text-2xl"
    >
      Sign in to your account
    </h1>

    <form
      method="POST"
      class="space-y-4 md:space-y-6"
      action="?/signIn"
      use:enhance={submitForm}
      novalidate
    >
      <div>
        <label for="email" class="block mb-2 text-sm font-medium"
          >Your email</label
        >
        <input
          type="email"
          name="email"
          id="email"
          class="text-gray-800 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="name@company.com"
          required
        />
        {#if errors?.email}
          <div class="text-red-400">{errors?.email[0]}</div>
        {/if}
      </div>
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium">Password</label
        >
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="text-gray-800 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
        {#if errors?.password}
          <div class="text-red-400">{errors?.password[0]}</div>
        {/if}
      </div>
      <div class="flex items-end justify-between">
        <!-- <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  required
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-500">Remember me</label>
              </div>
            </div> -->
        <ForgotPassword />
      </div>
      <button
        type="submit"
        class="text-white bg-emerald-600 hover:bg-emerald-500  border-white shadow-md active:shadow-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-100"
        >Sign in</button
      >
      <p class="text-sm font-light text-gray-300">
        Don’t have an account yet? <a
          href="/signup"
          class="font-medium text-primary-600 hover:underline">Sign up</a
        >
      </p>
    </form>
  </div>
</div>

