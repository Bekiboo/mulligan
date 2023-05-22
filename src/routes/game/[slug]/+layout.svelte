<script lang="ts">
	import { dragging } from '$lib/stores/states'
	import type { LayoutData } from './$types'
	import RightPanel from './ui/RightPanel.svelte'
	import Trash from './ui/Trash.svelte'

	export let data: LayoutData
	const { supabase } = data
</script>

<slot />

{#if $dragging}
	<Trash {supabase} />
{/if}

<RightPanel />
