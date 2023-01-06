<script lang="ts">
	import type { Token } from '$lib/types';
	import { getMiddleOfElement } from '$lib/utils'
	import { onMount } from 'svelte'

	export let token: Token;	
	let element: HTMLElement;
	let middleX: number;
	let middleY: number;

	onMount(() => {
		middleX = getMiddleOfElement(element).middleX
		middleY = getMiddleOfElement(element).middleY
	})
	
	// getMiddleOfElement(element)
</script>

<div bind:this={element}
	style="transform:translate({token.pos.x - middleX}px,{token.pos.y - middleY}px);z-index:{token.pos.z};"
	class="bg-red-500 rounded-full w-10 h-10 absolute"
/>
