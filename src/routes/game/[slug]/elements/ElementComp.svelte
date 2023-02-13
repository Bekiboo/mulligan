<script lang="ts">
	import { selectedElements } from '$lib/stores/elements'
	import type { Element } from '$lib/types'
	import { getCenter } from '$lib/utils'
	import { updateElementPos } from '$lib/db/elementService'
	import { onMount } from 'svelte'
	import { clickStartPos, dragging, hoveringTrash, movingElement, zoom } from '$lib/stores/states'
	import TokenComp from './TokenComp.svelte'

	export let element: Element
	let HTMLelement: HTMLElement
	let middleX: number
	let middleY: number

	$: selected = $selectedElements?.some((el: Element) => el.id == element.id)

	onMount(() => {
		middleX = getCenter(HTMLelement).middleX
		middleY = getCenter(HTMLelement).middleY
	})

	let originTokenPos: { x: number; y: number }

	const onTouchStart = (e: TouchEvent) => {
		// $dragging = element
		// originTokenPos = { x: element.pos.x, y: element.pos.y}
		// originClientX = e.touches[0].clientX
		// originClientY = e.touches[0].clientY
	}

	const onMouseDown = (e: any) => {
		$clickStartPos = { x: e.clientX, y: e.clientY }

		if ($selectedElements.length > 0 && selected) {
			// works when empty. There must be a way to optimize this.
		} else if (!e.ctrlKey) $selectedElements = [element]

		$dragging = true
	}

	const onGlobalMouseDown = (e: any) => {
		// required for multiple moving
		if (selected) {
			originTokenPos = { x: element.pos.x, y: element.pos.y }
		}
	}

	const onMouseUp = (e: any) => {
		console.log(element)
		console.log($selectedElements)

		// multiple selection with ctrl key
		if (e.ctrlKey) {
			if (selected) {
				$selectedElements = $selectedElements.filter((el: any) => el.id != element.id)
			} else {
				if ($selectedElements.length >= 10) return
				$selectedElements = [...$selectedElements, element]
			}
		} else if (
			// if group select but not dragging, then select only the clicked element
			$selectedElements.length > 1 &&
			originTokenPos?.x == element?.pos?.x &&
			originTokenPos?.y == element?.pos?.y
		) {
			$selectedElements = [element]
		} else if (
			$selectedElements.length == 1 &&
			originTokenPos?.x == element?.pos?.x &&
			originTokenPos?.y == element?.pos?.y &&
			selected
		) {
			// if only one element is selected, then select only the clicked element
			console.log('single select')
		}
	}

	const onGlobalMouseUp = (e: any) => {
		if (e.ctrlKey) return
		if ($hoveringTrash) return
		// if element is selected and has moved
		if (
			selected &&
			(originTokenPos?.x != element?.pos?.x || originTokenPos?.y != element?.pos?.y)
		) {
			updateElementPos(element)
		}
	}

	function onMouseMove(e: any) {
		if (!$dragging) return
		if (selected && !e.ctrlKey) {
			element.pos.x = Math.round(originTokenPos.x + (e.clientX - $clickStartPos.x) * (1 / $zoom))
			element.pos.y = Math.round(originTokenPos.y + (e.clientY - $clickStartPos.y) * (1 / $zoom))
		}
	}

	function onTouchMove(e: any) {
		// if ($dragging?.id == element.id) {
		// 	element.pos.x = originTokenPos.x + (e.touches[0].clientX - originClientX) * (1 / $zoom)
		// 	element.pos.y = originTokenPos.y + (e.touches[0].clientY - originClientY) * (1 / $zoom)
		// }
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
		<TokenComp {element} {selected} />
	{/if}
</div>

<svelte:window
	on:mousemove={onMouseMove}
	on:touchmove={onTouchMove}
	on:mousedown={onGlobalMouseDown}
	on:mouseup={onGlobalMouseUp}
/>

<style>
	.moving {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
	}
</style>
