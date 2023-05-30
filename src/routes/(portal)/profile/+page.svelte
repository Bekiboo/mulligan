<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import CreateGame from './CreateGame.svelte'

	export let data: PageData
	let games = data.games ?? []
	const user = data.user ?? { email: '' }

	async function signOut() {
		const { error } = await data.supabase.auth.signOut()

		goto('/')
		return error
	}

	const updateName = async (id: number) => {
		const { error } = await data.supabase.from('game').update({ name: 'test' }).eq('id', id)

		return error
	}
</script>

<div class="w-full bg-[#3F589E] rounded-2xl shadow sm:max-w-md xl:p-0 mb-4">
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<div class="font-bold leading-tight tracking-tight">
			Signed in as: <span class="ml-2 font-normal">{user.email}</span>
		</div>
	</div>
</div>

<div class="w-full bg-[#3F589E] rounded-2xl shadow sm:max-w-md xl:p-0">
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<div class="flex justify-between items-center">
			<div class="font-bold leading-tight tracking-tight">My Games</div>
			<CreateGame />
		</div>

		{#if games.length === 0}
			<div class="text-center">Loading...</div>
		{:else}
			{#each games as game}
				<div class="flex">
					<a
						href="/game/{game.slug}"
						class="border border-white flex rounded-2xl justify-between py-2 px-4 hover:bg-emerald-500 transition duration-100"
					>
						<p class="font-bold">{game.name}</p>
						<p>{game.mode}</p>
					</a>
					<button on:click={() => updateName(game.id)}>Change name</button>
				</div>
			{/each}
		{/if}
	</div>
</div>

<!-- logout button -->
<button
	class="bg-red-500 hover:bg-red-600 mt-4 text-white font-bold py-2 px-4 rounded"
	on:click={signOut}
>
	Logout
</button>
