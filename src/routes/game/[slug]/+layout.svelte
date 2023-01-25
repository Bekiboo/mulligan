<script lang="ts">
	import { draggedElement } from '$lib/stores/elements'
	import RightPanel from './ui/RightPanel.svelte'
	import Trash from './ui/Trash.svelte'
</script>

<slot />

{#if $draggedElement}
	<Trash />
{/if}

<RightPanel />
