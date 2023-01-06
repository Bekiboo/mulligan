<script lang="ts">
	import { supabase } from '$lib/db/supabase'
	import { user } from '$lib/stores/auth'

	function createGame() {
		supabase
			.from('game')
			.insert([
				{
					name: 'test',
					owner: $user.id
				}
			])
			.then((data) => {
				console.log(data)
			})
	}
</script>

<div class="border border-white rounded-2xl h-80 w-96">
	<button on:click={createGame}>Create Game</button>
</div>
