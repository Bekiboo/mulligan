<script lang="ts">
	import toast from 'svelte-french-toast'
	import Modal from '$lib/components/overlay/Modal.svelte'
	import { loadingState } from '$lib/stores/states'
	import { enhance, applyAction } from '$app/forms'
	import type { ActionResult } from '@sveltejs/kit'
	import Cross from '$lib/components/svg/Cross.svelte'

	let showModal = false
	const close = () => (showModal = false)

	let errors: any = []

	const submitForm = () => {
		loadingState.set(true)
		return async ({ result, update }: { result: ActionResult; update: any }) => {
			loadingState.set(false)

			if (result.type === 'failure') {
				errors = result.data?.errors

				toast.error(result.data?.message, {
					duration: 5000,
					style: 'margin-top: 4rem'
				})
				return await applyAction(result)
			}
			errors = []
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
<div
	on:click={() => (showModal = true)}
	class="text-white cursor-pointer bg-emerald-600 hover:bg-emerald-500 shadow-md active:shadow-none font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-100"
>
	Create New Game
</div>

{#if showModal}
	<Modal on:close={close}>
		<div class="flex justify-between text-white">
			<h2 class="text-lg md:text-xl font-bold leading-tight tracking-tight mb-4">
				Create New Game
			</h2>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="cursor-pointer scale-125 hover:scale-150 transition duration-100"
				on:click={close}
			>
				<Cross />
			</div>
		</div>

		<form class="mt-4" method="POST" action="?/createGame" use:enhance={submitForm} novalidate>
			<label for="name" class="block mb-2 text-sm font-medium">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
				placeholder="My Mulligan Game"
				required
			/>
			{#if errors?.name}
				<div class="text-yellow-300 font-bold">{errors?.name[0]}</div>
			{/if}

			<!-- <label for="email" class="block mb-2 text-sm font-medium">Mode</label>
			<input
				type="email"
				name="email"
				id="email-for-reset-password"
				class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
				placeholder="name@company.com"
				required
			/>
			{#if errors?.email}
				<div class="text-yellow-300 font-bold">{errors?.email[0]}</div>
			{/if} -->

			<button
				class="bg-emerald-600 cursor-pointer mt-4 text-white w-fit mx-auto rounded-xl drop-shadow-md active:drop-shadow-none duration-100 py-2 px-4 hover:bg-emerald-500"
			>
				Create Game
			</button>
		</form>
	</Modal>
{/if}
