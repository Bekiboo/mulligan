<script lang="ts">
	import '../app.css'
	import { supabase } from '$lib/db/supabase'
	import { navigating } from '$app/stores'
	import { onMount } from 'svelte'
	import { user } from '$lib/stores/auth'
	import PreloadingIndicator from '$lib/components/overlay/PreloadingIndicator.svelte'
	import LoadingScreen from '$lib/components/overlay/LoadingScreen.svelte'
	import { loadingState } from '$lib/stores/states'
	import RightPanel from '$lib/components/RightPanel.svelte'
	import { Toaster } from 'svelte-french-toast'
	// import CircleMenu from '$lib/CircleMenu.svelte'

	export let data: any

	console.log(data.session)

	$user = { id: data.user?.id, email: data.user?.email }

	onMount(async () => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				$user = { id: data.user.id, email: data.user.email }
			}
			return
		})
	})
	let slotWidth: number
	onMount(() => {
		slotWidth = window.innerWidth - 120
	})
</script>

<Toaster />

{#if $navigating}
	<PreloadingIndicator />
{/if}

{#if $loadingState}
	<LoadingScreen />
{/if}

<RightPanel />
<!-- <CircleMenu /> -->
<div style="width: {slotWidth}px;" class="text-white">
	<slot />
</div>

<svelte:window on:resize={() => (slotWidth = window.innerWidth - 120)} />
