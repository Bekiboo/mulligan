<script lang="ts">
	import { dragging } from '$lib/stores/states'
	import RightPanel from './ui/RightPanel.svelte'
	import Trash from './ui/Trash.svelte'
</script>

<slot />

{#if $dragging}
	<Trash />
{/if}

<RightPanel />
