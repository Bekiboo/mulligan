<script lang="ts">
	import toast from 'svelte-french-toast'
	import Modal from '$lib/components/overlay/Modal.svelte'
	import { loadingState } from '$lib/stores/states'
	import { enhance, applyAction } from '$app/forms'
	import CrossSvg from '$lib/components/svg/CrossSvg.svelte'
	import type { FormError } from '$lib/types'
	import type { SubmitFunction } from '@sveltejs/kit'

	let showModal = false
	const close = () => (showModal = false)

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
			toast.success('Check your email', {
				duration: 5000,
				style: 'margin-top: 4rem'
			})
			close()
			update()
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
	on:click={() => (showModal = true)}
	class="text-sm font-medium text-primary-600 hover:underline cursor-pointer"
>
	Forgot password?
</button>

{#if showModal}
	<Modal on:close={close}>
		<div class="flex justify-between text-white">
			<h2 class="text-lg md:text-xl font-bold leading-tight tracking-tight mb-4">
				Forgot your password?
			</h2>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button
				class="cursor-pointer scale-125 hover:scale-150 transition duration-100"
				on:click={close}
			>
				<CrossSvg />
			</button>
		</div>
		<p>Don't fret! Just type in your email and we will send you a link to reset your password!</p>

		<form class="mt-4" method="POST" action="?/resetPassword" use:enhance={submitForm} novalidate>
			<label for="email" class="block mb-2 text-sm font-medium">Your email</label>
			<input
				type="email"
				name="email"
				id="email-for-reset-password"
				class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
				placeholder="name@company.com"
				required
			/>
			{#if errors.email}
				<div class="text-yellow-300 font-bold">{errors.email[0]}</div>
			{/if}

			<button
				class="bg-rose-500 cursor-pointer mt-4 text-white w-fit mx-auto rounded-xl drop-shadow-md
    active:drop-shadow-none duration-100 py-2 px-4
    hover:bg-rose-400"
			>
				Reset Password
			</button>
		</form>
	</Modal>
{/if}
