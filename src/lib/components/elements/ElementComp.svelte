<script lang="ts">
	import { draggedElement, selectedElements } from '$lib/stores/elements'
	import type { Element } from '$lib/types'
	import { getCenter } from '$lib/utils'
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
		draggedElement?.set(element)
		let x = element.pos.x
		let y = element.pos.y
		let z = element.pos.z
		currentPos = { x, y, z }
		originalX = e.touches[0].clientX
		originalY = e.touches[0].clientY
	}

	const onMouseDown = (e: any) => {
		draggedElement?.set(element)
		let x = element.pos.x
		let y = element.pos.y
		let z = element.pos.z
		currentPos = { x, y, z }
		originalX = e.clientX
		originalY = e.clientY
	}

	const onMouseUp = (e: any) => {
		// check if element is being dragged
		if (currentPos.x != element.pos.x && currentPos.y != element.pos.y) {
			updateElementPos(element)
			return
		}

		if (!e.ctrlKey) {
			$selectedElements = [element]
		}

		if (e.ctrlKey) {
			if ($selectedElements.some((el: Element) => el.id == element.id)) {
				selectedElements?.update((elements: Element[]) => {
					elements = elements.filter((el: Element) => el.id != element.id)
					return elements
				})
			} else {
				// add element to selectedElements
				selectedElements?.update((elements: Element[]) => {
					elements = [...elements, element]
					return elements
				})
			}
		}
	}

	function onMouseMove(e: any) {
		if ($draggedElement?.id == element?.id && !e.ctrlKey) {
			element.pos.x = currentPos.x + (e.clientX - originalX) * (1 / $zoom)
			element.pos.y = currentPos.y + (e.clientY - originalY) * (1 / $zoom)
		}
	}

	function onTouchMove(e: any) {
		if ($draggedElement?.id == element.id) {
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
	class="absolute ease-in-out"
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
