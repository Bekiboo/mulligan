<script lang="ts">
	import { enhance, applyAction } from '$app/forms'
	import { loadingState } from '$lib/stores/states'
	import toast from 'svelte-french-toast'
	import type { PageData } from './$types'
	import type { FormError } from '$lib/types'
	import type { SubmitFunction } from '$app/forms'

	export let data: PageData
	let errors: FormError = {}

	const submitForm: SubmitFunction = () => {
		$loadingState = true
		return async ({ result, update }) => {
			$loadingState = false

			if (result.type === 'failure') {
				errors = result.data?.errors

				toast.error(result.data?.message, {
					duration: 5000,
					style: 'margin-top: 4rem'
				})
				return await applyAction(result)
			}
			errors = {}
			toast.success('Password changed', {
				duration: 5000,
				style: 'margin-top: 4rem'
			})
			update()
		}
	}
</script>

<div class="w-full bg-[#3F589E] rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0">
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">Update Password</h1>

		<p class="font-medium mb-4">
			Hi {data.session?.user.email ?? ''}, Enter your new password below and confirm it
		</p>

		<form method="POST" class="space-y-4 md:space-y-6" use:enhance={submitForm} novalidate>
			<div>
				<label for="password" class="block mb-2 text-sm font-medium">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="••••••••"
					required
				/>
				{#if errors?.password}
					<div class="text-red-500">{errors?.password[0]}</div>
				{/if}
			</div>
			<div>
				<label for="confirmPassword" class="block mb-2 text-sm font-medium">Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					placeholder="••••••••"
					class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					required
				/>
				{#if errors?.passwordNotMatching == true}
					<div class="text-red-500">Both passwords have to match</div>
				{/if}
				{#if errors?.confirmPassword}
					<div class="text-red-500">{errors?.confirmPassword[0]}</div>
				{/if}
			</div>
			<div class="flex items-end justify-between" />

			<button
				type="submit"
				class="text-white bg-emerald-600 hover:bg-emerald-500 shadow-md active:shadow-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-100"
				>Update Password</button
			>
		</form>
	</div>
</div>

<!-- <div
  class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
  <h2 class="font-semibold text-4xl mb-4">Update Password</h2>
  <p class="font-medium mb-4">
    Hi {data.session?.user.email}, Enter your new password below and confirm it
  </p>
  <form class="" method="post" use:enhance>
    <div class="form-control">
      <label for="password" class="label">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form?.password ?? ''}
        class="input input-bordered"
      />
    </div>
    <div class="form-control">
      <label for="confirmPassword" class="label">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value=""
        class="input input-bordered"
      />
    </div>
    {#if form?.errors?.confirmPassword}
    {/if}
    <div class="form-control mt-6">
      <button class="btn btn-primary no-animation">Update Password</button>
    </div>
  </form>
</div> -->
