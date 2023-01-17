<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
	import type { Element } from '$lib/types'
	import { getCenter } from '$lib/utils'
	import { updateElementPos } from '$lib/db/elementService'
	import { onMount } from 'svelte'
	import { devicePixelRatio } from '$lib/stores/states'

	export let element: Element
	let HTMLelement: HTMLElement
	let middleX: number
	let middleY: number

	onMount(() => {
		middleX = getCenter(HTMLelement).middleX
		middleY = getCenter(HTMLelement).middleY
	})

	let currentPos: { x: number; y: number; z: number }

	const onTouchStart = (e: TouchEvent) => {
		e.preventDefault()
		console.log('touchstart');
		
	}

	const onMouseDown = () => {
		selectedElement.set(element.id)
		let x = element.pos.x
		let y = element.pos.y
		let z = element.pos.z
		currentPos = { x, y, z }
	}
	const onMouseUp = () => {
		selectedElement.set(null)

		if (currentPos.x == element.pos.x && currentPos.y == element.pos.y) {
			return
		}		

		updateElementPos(element)
	}

	function onMouseMove(e: any) {
        // console.log(e);
        
		if ($selectedElement == element.id) {
			element.pos.x += e.movementX / $devicePixelRatio
			element.pos.y += e.movementY / $devicePixelRatio
		}
	}
</script>

<div
	bind:this={HTMLelement}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
	on:touchstart={onMouseDown}
	on:touchend={onMouseUp}
	style="transform:translate({element.pos.x - middleX}px,{element.pos.y - middleY}px);z-index:{element.pos
		.z};"
	class="bg-red-500 rounded-full w-10 h-10 absolute"
/>

<svelte:window on:mousemove={onMouseMove} on:touchmove={onMouseMove} />