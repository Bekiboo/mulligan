<script lang="ts">
	import '../app.css'
	import { invalidate } from '$app/navigation'
	import { navigating } from '$app/stores'
	import { supabase } from '$lib/db/supabase'
	import { user } from '$lib/stores/auth'
	import { loadingState } from '$lib/stores/states'
	import { onMount } from 'svelte'
	import { Toaster } from 'svelte-french-toast'
	import LoadingScreen from '$lib/components/overlay/LoadingScreen.svelte'
	import PreloadingIndicator from '$lib/components/overlay/PreloadingIndicator.svelte'

	export let data: any

	$user = { id: data.user?.id, email: data.user?.email }

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			//   if (event == 'PASSWORD_RECOVERY') {
			//     const newPassword = prompt(
			//       'What would you like your new password to be?'
			//     )
			//     const { data, error } = await supabase.auth.update({
			//       password: newPassword,
			//     })

			//     if (data) alert('Password updated successfully!')
			//     if (error) alert('There was an error updating your password.')
			//   }
			invalidate('supabase:auth')
		})

		return () => {
			subscription.unsubscribe()
		}
	})
</script>

<Toaster />

{#if $navigating}<PreloadingIndicator />{/if}

{#if $loadingState}<LoadingScreen />{/if}

<slot />
