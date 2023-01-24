<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
	import RightPanel from './ui/RightPanel.svelte'
	import Trash from './ui/Trash.svelte'
</script>

<slot />

{#if $selectedElement}
	<Trash />
{/if}

<RightPanel />
