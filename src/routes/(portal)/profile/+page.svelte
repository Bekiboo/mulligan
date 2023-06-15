<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import CreateGame from './CreateGame.svelte'

	export let data: PageData
	let games = data.games ?? []
	const user = data.user ?? { email: '' }

	let updating: number

	async function signOut() {
		const { error } = await data.supabase.auth.signOut()

		goto('/')
		return error
	}

	// const updateName = async (id: number) => {
	// 	const { error } = await data.supabase.from('game').update({ name: 'test' }).eq('id', id)

	// 	return error
	// }
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
			<CreateGame bind:games />
		</div>

		{#if games.length === 0}
			<div class="text-center">Loading...</div>
		{:else}
			{#each games as game}
				<div class="flex justify-between">
					{#if updating == game.id}
						<form method="POST" action="?/updateGameName" use:enhance novalidate>
							<input class="text-slate-800" type="text" id="name" name="name" />

							<input type="hidden" name="slug" value={game.slug} />

							<button>Confirm</button>
						</form>
					{:else}
						<a
							href="/game/{game.slug}"
							class="border border-white flex rounded-2xl justify-between py-2 px-4 hover:bg-emerald-500 transition duration-100"
						>
							<p class="font-bold">{game.name}</p>
						</a>
					{/if}

					<button on:click={() => (updating = game.id)}>
						<svg
							style="width: 2rem;	height: 2rem;"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
					</button>
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

<!-- <dialog id="create-game">
	<form method="POST" action="?/createGame" use:enhance novalidate>
		<label for="name">Game Name</label>
		<input type="text" id="name" name="name" />

		<button>Create</button>
	</form>
</dialog> -->
