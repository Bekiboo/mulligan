<script lang="ts">
	import { supabase } from '$lib/db/supabase'
	// import { user } from '$lib/stores/auth'
	import { onMount } from 'svelte'

	let email: string

	async function signInWithEmail() {
		const { data, error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: 'http://127.0.0.1:5173/'
			}
		})
		console.log('DATA: ' + JSON.stringify(data))
		console.log('ERROR: ' + error)
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}
</script>

<div class="h-screen bg-slate-800 flex items-center justify-center">
	<img src="/img/big-logo.png" alt="" />
</div>


<!-- {#if user != undefined || user != null}
	<form on:submit|preventDefault={signInWithEmail}>
		<input type="email" name="email" placeholder="email" bind:value={email} />
		<button>Sign in with email</button>
	</form>
{:else}
	<img
		class="h-14 rounded-full m-2 bg-slate-800"
		src="https://avatars.dicebear.com/api/identicon/:fdgdf{$user.email}.svg"
		alt="avatar"
	/>
	<p>Logged in as {$user.email}</p>
	<button on:click={signOut}>Sign out</button>
	<a href="/game">Join a game</a>
{/if} -->
