<script lang="ts">
	import { createBrdElem } from '$lib/db/brdElemService'
	import { selectedBrdElems } from '$lib/stores/brdElem'
	import { dragging, zoom } from '$lib/stores/states'
	import { tokenTool } from '$lib/stores/toolbar'
	import { onMount } from 'svelte'
	import ZoomIndicator from './ui/ZoomIndicator.svelte'

	export let boardWidth: number
	export let boardHeight: number
	export let data: any
	let windowWidth: number
	let windowHeight: number
	let left: number
	let top: number
	let board: HTMLElement

	onMount(() => {
		windowWidth = window.innerWidth
		windowHeight = window.innerHeight
		left = (boardWidth - windowWidth) / -2
		top = (boardHeight - windowHeight) / -2
		originalLeft = left
		originalTop = top
	})

	let moving = false
	let originalX: number
	let originalY: number
	let originalLeft: number
	let originalTop: number

	let clientX: number
	let clientY: number

	let dx: number
	let dy: number

	let layerX: number
	let layerY: number

	const onMouseDown = (e: any) => {
		moving = true
		originalX = e.clientX
		originalY = e.clientY
		originalLeft = left
		originalTop = top
	}

	const onTouchStart = (e: any) => {
		moving = true
		originalX = e.touches[0].clientX
		originalY = e.touches[0].clientY
		originalLeft = left
		originalTop = top
	}

	const onMouseUp = (e: any) => {
		moving = false
		$dragging = false
	}

	function onMouseMove(e: any) {
		clientX = e.clientX
		clientY = e.clientY

		layerX = e.layerX
		layerY = e.layerY

		if ($dragging) return

		if (!moving) return

		left = originalLeft + (e.clientX - originalX)
		top = originalTop + (e.clientY - originalY)
	}

	function onTouchMove(e: any) {
		if ($dragging) return

		if (!moving) return

		left = originalLeft + (e.touches[0].clientX - originalX)
		top = originalTop + (e.touches[0].clientY - originalY)
	}

	let MAX_ZOOM = 2
	let MIN_ZOOM = 0.5
	// TODO: fix to zoom on pointer
	function wheel(e: any) {
		if ($dragging) return
		// let layer = { x: layerX, y: layerY }
		$zoom = $zoom || 1
		$zoom += e.deltaY / -1000
		$zoom = Math.round(Math.min(Math.max(MIN_ZOOM, $zoom), MAX_ZOOM) * 100) / 100

		// left = (layer.x / $zoom - (clientX)) * -1
		// top = (layer.y / $zoom - (clientY)) * -1
	}
	// TODO: add Pinch to zoom

	function handleBoardClick(e: any) {
		if ($dragging) return

		// unselect all brdElems if clicked on board
		if (e.target.ariaLabel != 'element' && !e.ctrlKey) {
			$selectedBrdElems = []
		}

		// TOFIX: offset shifts slightly when zooming
		if ($tokenTool) {
			createBrdElem('token', data.slug, data.session.user.id, e.offsetX, e.offsetY)
			return
		}
	}
</script>

<ZoomIndicator />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section
	on:mousedown={onMouseDown}
	on:touchstart={onTouchStart}
	on:wheel|preventDefault={wheel}
	on:click={handleBoardClick}
	bind:this={board}
	style="left: {left}px; top: {top}px; transform: scale({$zoom});"
	class="select-none cursor-move fixed z-[-1] bg-slate-800"
>
	<slot />
</section>

<svelte:window
	on:mouseup={onMouseUp}
	on:touchend={onMouseUp}
	on:mousemove={onMouseMove}
	on:touchmove={onTouchMove}
/>

<!-- // console.log('layer: ', e.layerX, e.layerY);
// console.log('client: ', e.clientX, e.clientY);
// console.log('page: ', e.pageX, e.pageY);
// console.log('offset: ', e.offsetX, e.offsetY);
// console.log('screen: ', e.screenX, e.screenY);
// console.log('board: ', board.offsetLeft, board.offsetTop);
// console.log('left: ', left, ' - ', 'top: ', top);
// console.log('------------------'); -->
