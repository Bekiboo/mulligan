<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
	import type { Element } from '$lib/types'
	import { getCenter } from '$lib/utils'
	import { updateElementPos } from '$lib/db/elementService'
	import { onMount } from 'svelte'
	import { zoom } from '$lib/stores/states'

	export let element: Element
	let HTMLelement: HTMLElement
	let middleX: number
	let middleY: number

	onMount(() => {
		middleX = getCenter(HTMLelement).middleX
		middleY = getCenter(HTMLelement).middleY
	})

	let currentPos: { x: number; y: number; z: number }
	let originalX: number
	let originalY: number

	const onTouchStart = (e: TouchEvent) => {
		selectedElement.set(element.id)
		let x = element.pos.x
		let y = element.pos.y
		let z = element.pos.z
		currentPos = { x, y, z }
		originalX = e.touches[0].clientX
		originalY = e.touches[0].clientY
	}

	const onMouseDown = (e: any) => {
		selectedElement.set(element.id)
		let x = element.pos.x
		let y = element.pos.y
		let z = element.pos.z
		currentPos = { x, y, z }
		originalX = e.clientX
		originalY = e.clientY
	}
	const onMouseUp = () => {
		if (currentPos.x == element.pos.x && currentPos.y == element.pos.y) {
			return
		}
		updateElementPos(element)
	}

	function onMouseMove(e: any) {
		if ($selectedElement == element.id) {
			element.pos.x = currentPos.x + (e.clientX - originalX) * (1 / $zoom)
			element.pos.y = currentPos.y + (e.clientY - originalY) * (1 / $zoom)
		}
	}

	function onTouchMove(e: any) {
		if ($selectedElement == element.id) {
			element.pos.x = currentPos.x + (e.touches[0].clientX - originalX) * (1 / $zoom)
			element.pos.y = currentPos.y + (e.touches[0].clientY - originalY) * (1 / $zoom)
		}
	}
</script>

<div
	bind:this={HTMLelement}
	on:mousedown|preventDefault={onMouseDown}
	on:mouseup|preventDefault={onMouseUp}
	on:touchstart|preventDefault={onTouchStart}
	on:touchend|preventDefault={onMouseUp}
	style="transform:translate({element.pos.x - middleX}px,{element.pos.y -
		middleY}px);z-index:{element.pos.z};"
	class="bg-red-500 rounded-full w-10 h-10 absolute ease-in-out"
	class:moving={element.id != $selectedElement}
/>

<svelte:window on:mousemove={onMouseMove} on:touchmove={onTouchMove} />

<style>
	.moving {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
	}
</style>
