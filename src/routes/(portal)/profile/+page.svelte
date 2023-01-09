<script lang="ts">
	import { supabase } from '$lib/db/supabase'
	import { user } from '$lib/stores/auth'
	import CreateGame from './CreateGame.svelte'

	let games: any = []

	// fetch games from supabase db by user id
	async function getGames() {
		const { data, error } = await supabase.from('game').select('*').eq('owner', $user.id)
		if (error) {
			console.log(error)
		}
		games = data
	}

	getGames()
</script>

<div class="w-full bg-[#3F589E] rounded-2xl shadow sm:max-w-md xl:p-0 mb-4">
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<div class="font-bold leading-tight tracking-tight">
			Signed in as: <span class="ml-2 font-normal">{$user.email}</span>
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
				<a
					href="/game/{game.slug}"
					class="border border-white flex rounded-2xl justify-between py-2 px-4 hover:bg-emerald-500 transition duration-100"
				>
					<p class="font-bold">{game.name}</p>
					<p>{game.mode}</p>
				</a>
			{/each}
		{/if}
	</div>
</div>

<!-- display games when ready -->
