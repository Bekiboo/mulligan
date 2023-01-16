<script lang="ts">
	import type { Token } from '$lib/types';
	import { getCenter } from '$lib/utils'
	import { onMount } from 'svelte'

	export let token: Token;	
	let element: HTMLElement;
	let middleX: number;
	let middleY: number;

	onMount(() => {
		middleX = getCenter(element).middleX
		middleY = getCenter(element).middleY
	})

	let moving = false;

	const onMouseDown = () => (console.log('down'), moving = true)
	const onMouseUp = () => (console.log('up'), moving = false)

	function onMouseMove(e: MouseEvent) {
		console.log('move');
		
		// if (!moving) {
		// 	return
		// }
		// const { innerWidth, innerHeight } = window
		// const { x, y, right, bottom } = element.getBoundingClientRect()

		// if (x < 0) {
		// 	right < innerWidth ? (token.pos.x = innerWidth - middleX) : (token.pos.x += e.movementX)
		// } else {
		// 	token.pos.x = middleX
		// }

		// if (y < 0) {
		// 	bottom < innerHeight ? (token.pos.y = innerHeight - middleY) : (token.pos.y += e.movementY)
		// } else {
		// 	token.pos.y = middleY
		// }
	}
	
	// getMiddleOfElement(element)
</script>

<div bind:this={element}
	on:mousedown={onMouseDown}
	style="transform:translate({token.pos.x - middleX}px,{token.pos.y - middleY}px);z-index:{token.pos.z};"
	class="bg-red-500 rounded-full w-10 h-10 absolute"
/>


<!-- <svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} /> -->