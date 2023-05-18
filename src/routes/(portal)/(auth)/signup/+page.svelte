<script lang="ts">
	import toast from 'svelte-french-toast'
	import { enhance, applyAction } from '$app/forms'
	import { loadingState, registrating } from '$lib/stores/states'
	import type { ActionResult } from '@sveltejs/kit'
	import type { FormError } from '$lib/types'

	let email: string
	let errors: FormError = {}

	const submitForm = () => {
		loadingState.set(true)
		return async ({ result, update }: { result: ActionResult; update: () => void }) => {
			loadingState.set(false)

			if (result.type === 'failure') {
				errors = result.data?.errors

				toast.error(result.data?.message, {
					duration: 5000,
					style: 'margin-top: 4rem'
				})
				return await applyAction(result)
			}
			errors = {}
			toast.success('Registration succeed!', {
				duration: 5000,
				style: 'margin-top: 4rem'
			})
			registrating.set({ status: true, email: email })
			update()
		}
	}
</script>

<div class="w-full bg-[#3F589E] rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0">
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">Sign up</h1>

		<form
			method="post"
			class="space-y-4 md:space-y-6"
			action="?/signUp"
			use:enhance={submitForm}
			novalidate
		>
			<div>
				<label for="email" class="block mb-2 text-sm font-medium ">Your email</label>
				<input
					bind:value={email}
					type="email"
					name="email"
					id="email"
					class="text-gray-800 bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="name@company.com"
					required
				/>
				{#if errors.email}
					<div class="text-red-400">{errors.email[0]}</div>
				{/if}
			</div>
			<div>
				<label for="password" class="block mb-2 text-sm font-medium ">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					class="text-gray-800 bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					required
				/>
				{#if errors.password}
					<div class="text-red-400">{errors.password[0]}</div>
				{/if}
			</div>
			<div>
				<label for="confirmPassword" class="block mb-2 text-sm font-medium ">Confirm password</label
				>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					placeholder="••••••••"
					class="text-gray-800 bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					required
				/>
				{#if errors.confirmPassword}
					<div class="text-red-400">{errors.confirmPassword[0]}</div>
				{/if}
				{#if errors.passwordNotMatching == true}
					<div class="text-red-400">Both passwords have to match</div>
				{/if}
			</div>
			<div class="flex items-end justify-between" />
			<p class="text-sm text-gray-300">
				During the Alpha it is not required to have a secure password, but you are still advised to
				do so.
			</p>
			<button
				type="submit"
				class="text-white bg-emerald-600 hover:bg-emerald-500 shadow-md active:shadow-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-100"
				>Sign up</button
			>
			<p class="text-sm font-light text-gray-300">
				Already have an account? <a
					href="/signin"
					class="font-medium text-primary-600 hover:underline">Sign in</a
				>
			</p>
		</form>
	</div>
</div>

<!-- Rajouter Password validation pour aider l'user à créer un mot de passe sécurisé -->
