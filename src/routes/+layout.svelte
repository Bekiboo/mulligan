<script lang="ts">
	import { navigating } from '$app/stores'
	import LoadingScreen from '$lib/components/overlay/LoadingScreen.svelte'
	import PreloadingIndicator from '$lib/components/overlay/PreloadingIndicator.svelte'
	import { supabase } from '$lib/db/supabase'
	import { user } from '$lib/stores/auth'
	import { loadingState } from '$lib/stores/states'
	import { onMount } from 'svelte'
	import { Toaster } from 'svelte-french-toast'
	import '../app.css'

	export let data: any

	// console.log(data.session)

	$user = { id: data.user?.id, email: data.user?.email }

	onMount(async () => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				$user = { id: data.user.id, email: data.user.email }
			}
			return
		})
	})
</script>

<Toaster />

{#if $navigating}<PreloadingIndicator />{/if}

{#if $loadingState}<LoadingScreen />{/if}

<slot />