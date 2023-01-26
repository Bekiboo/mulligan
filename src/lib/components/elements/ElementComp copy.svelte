<script lang="ts">
	import { draggedElements, selectedElements } from '$lib/stores/elements'
	import type { Element } from '$lib/types'
	import { getCenter, idInArray } from '$lib/utils'
	import { updateElementPos } from '$lib/db/elementService'
	import { onMount } from 'svelte'
	import { movingElement, zoom } from '$lib/stores/states'
	import TokenComp from './TokenComp.svelte'

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
		$draggedElements = element
		currentPos = { x: element.pos.x, y: element.pos.y, z: element.pos.z }
		originalX = e.touches[0].clientX
		originalY = e.touches[0].clientY
	}

	const onMouseDown = (e: any) => {
		if (!idInArray(element, $selectedElements)) {
			$draggedElements = [...$selectedElements, element]
		} else if ($selectedElements.length < 1) {
			$draggedElements = [element]
		} else {
			$draggedElements = $selectedElements
		}

		currentPos = { x: element.pos.x, y: element.pos.y, z: element.pos.z }
		originalX = e.clientX
		originalY = e.clientY
	}

	const onMouseUp = (e: any) => {
		// check if element is being dragged
		if (currentPos?.x != element?.pos?.x && currentPos?.y != element?.pos?.y) {
			updateElementPos(element)
			return
		}

		// simple selection
		if (!e.ctrlKey) $selectedElements = [element]

		// multiple selection with ctrl key
		if (e.ctrlKey) {
			if (idInArray(element, $selectedElements)) {
				$selectedElements = $selectedElements.filter((el: Element) => el.id != element.id)
			} else {
				if ($selectedElements.length >= 10) return
				$selectedElements = [...$selectedElements, element]
			}
		}
	}

	function onMouseMove(e: any) {
		if (idInArray(element, $draggedElements) && !e.ctrlKey) {
			// let mouseOffsetX = e.clientX - originalX
			// let mouseOffsetY = e.clientY - originalY
			element.pos.x = currentPos.x + (e.clientX - originalX) * (1 / $zoom)
			element.pos.y = currentPos.y + (e.clientY - originalY) * (1 / $zoom)
		}
	}

	function onTouchMove(e: any) {
		if ($draggedElements?.id == element.id) {
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
	class="absolute ease-in-out cursor-grab"
	class:moving={element.id == $movingElement}
>
	{#if element.type == 'token'}
		<TokenComp {element} />
	{/if}
</div>

<svelte:window on:mousemove={onMouseMove} on:touchmove={onTouchMove} />

<style>
	.moving {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
	}
</style>
