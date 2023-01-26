<script lang="ts">
	import { draggedElements } from '$lib/stores/elements'
	import RightPanel from './ui/RightPanel.svelte'
	import Trash from './ui/Trash.svelte'
</script>

<slot />

{#if $draggedElements.length > 0}
	<Trash />
{/if}

<RightPanel />
