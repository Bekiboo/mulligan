<script lang="ts">
	import { selectedBrdElems } from '$lib/stores/brdElem'
	import type { BrdElem } from '$lib/types'
	import { updateBrdElemPos } from '$lib/db/brdElemService'
	import { clickStartPos, dragging, hoveringTrash, movingBrdElem, zoom } from '$lib/stores/states'
	import TokenComp from './TokenComp.svelte'
	import type { SupabaseClient } from '@supabase/supabase-js'
	import CardComp from './CardComp.svelte'
	import BrdElemMenu from './BrdElemMenu.svelte'

	export let brdElem: BrdElem

	export let supabase: SupabaseClient

	let brdElemCompHeight: number
	let brdElemCompWidth: number

	// let selected: 'light' | 'full'

	// $: if ($selectedBrdElems?.some((el: BrdElem) => el.id == brdElem.id)) {
	// 	if ($selectedBrdElems.length > 1) {
	// 		selected = 'light'
	// 	} else if ($selectedBrdElems.length == 1) {
	// 		selected = 'full'
	// 	}
	// }

	$: selected = $selectedBrdElems?.some((el: BrdElem) => el.id == brdElem.id)

	let originTokenPos: { x: number; y: number }

	let mouseDown = false

	const onTouchStart = (e: TouchEvent) => {
		// $dragging = brdElem
		// originTokenPos = { x: brdElem.pos.x, y: brdElem.pos.y}
		// originClientX = e.touches[0].clientX
		// originClientY = e.touches[0].clientY
	}

	const onMouseDown = (e: MouseEvent) => {
		mouseDown = true
		$clickStartPos = { x: e.clientX, y: e.clientY }

		if ($selectedBrdElems.length > 0 && selected) {
			// required for multiple moving
			// works when empty. There must be a way to optimize this.
		} else if (!e.ctrlKey) $selectedBrdElems = [brdElem]
	}

	const onGlobalMouseDown = () => {
		// required for multiple moving
		if (selected) {
			originTokenPos = { x: brdElem.pos.x, y: brdElem.pos.y }
		}
	}

	const onMouseUp = (e: MouseEvent | TouchEvent) => {
		mouseDown = false
		// multiple selection with ctrl key
		if (e.ctrlKey) {
			if (selected) {
				$selectedBrdElems = $selectedBrdElems.filter((el: BrdElem) => el.id != brdElem.id)
			} else {
				if ($selectedBrdElems.length >= 10) return
				$selectedBrdElems = [...$selectedBrdElems, brdElem]
			}
		} else if (
			// if group select but not dragging, then select only the clicked brdElem
			$selectedBrdElems.length > 1 &&
			originTokenPos?.x == brdElem?.pos?.x &&
			originTokenPos?.y == brdElem?.pos?.y
		) {
			$selectedBrdElems = [brdElem]
		}
	}

	const onGlobalMouseUp = (e: MouseEvent) => {
		if (e.ctrlKey) return
		if ($hoveringTrash) return
		// if brdElem is selected and has moved
		if (
			selected &&
			(originTokenPos?.x != brdElem?.pos?.x || originTokenPos?.y != brdElem?.pos?.y)
		) {
			updateBrdElemPos(supabase, brdElem)
		}
	}

	function onMouseMove(e: MouseEvent) {
		if (mouseDown) {
			console.log('mouse down')

			$dragging = true
		}
		if (!$dragging) return // frees the element
		if (selected && !e.ctrlKey) {
			brdElem.pos.x = Math.round(originTokenPos.x + (e.clientX - $clickStartPos.x) * (1 / $zoom))
			brdElem.pos.y = Math.round(originTokenPos.y + (e.clientY - $clickStartPos.y) * (1 / $zoom))
		}
	}

	function onTouchMove(e: TouchEvent) {
		// if ($dragging?.id == brdElem.id) {
		// 	brdElem.pos.x = originTokenPos.x + (e.touches[0].clientX - originClientX) * (1 / $zoom)
		// 	brdElem.pos.y = originTokenPos.y + (e.touches[0].clientY - originClientY) * (1 / $zoom)
		// }
	}
</script>

<div
	bind:clientHeight={brdElemCompHeight}
	bind:clientWidth={brdElemCompWidth}
	on:mousedown|preventDefault={onMouseDown}
	on:mouseup|preventDefault={onMouseUp}
	on:touchstart|preventDefault={onTouchStart}
	on:touchend|preventDefault={onMouseUp}
	style="transform:translate({brdElem.pos.x - brdElemCompWidth / 2}px,{brdElem.pos.y -
		brdElemCompHeight / 2}px);z-index:{brdElem.pos.z};"
	class="absolute ease-in-out cursor-grab"
	class:moving={brdElem.id == $movingBrdElem}
>
	<p class="text-white">{$selectedBrdElems.length}</p>
	{#if brdElem.type == 'token'}
		<TokenComp {brdElem} {selected} />
	{:else if brdElem.type == 'card'}
		<CardComp {brdElem} {selected} />
	{/if}

	<!-- {#if selected && $selectedBrdElems.length == 1}
		<BrdElemMenu {brdElemCompWidth} />
	{/if} -->
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
