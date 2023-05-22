<script lang="ts">
	import '../app.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { LayoutData } from './$types'

	import { navigating } from '$app/stores'
	import { user } from '$lib/stores/auth'
	import { loadingState } from '$lib/stores/states'
	import { Toaster } from 'svelte-french-toast'
	import LoadingScreen from '$lib/components/overlay/LoadingScreen.svelte'
	import PreloadingIndicator from '$lib/components/overlay/PreloadingIndicator.svelte'

	export let data: LayoutData

	$: ({ supabase, session } = data)

	if (session) {
		$user = { id: session.user.id, email: session.user.email ?? '' }
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	})
</script>

<Toaster />

{#if $navigating}<PreloadingIndicator />{/if}

{#if $loadingState}<LoadingScreen />{/if}

<slot />
