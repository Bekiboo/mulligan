<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
	import { zoom } from '$lib/stores/states'
	import { onMount } from 'svelte'
	import ZoomIndicator from './ui/ZoomIndicator.svelte'

	export let boardWidth: number
	export let boardHeight: number
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

	const onMouseUp = () => {
		moving = false
		selectedElement.set(null)
	}

	function onMouseMove(e: any) {
		clientX = e.clientX
		clientY = e.clientY

		layerX = e.layerX
		layerY = e.layerY

		if ($selectedElement) return

		if (!moving) return

		left = originalLeft + (e.clientX - originalX)
		top = originalTop + (e.clientY - originalY)
	}

	function onTouchMove(e: any) {
		if ($selectedElement) return

		if (!moving) return

		left = originalLeft + (e.touches[0].clientX - originalX) * (1 / $zoom)
		top = originalTop + (e.touches[0].clientY - originalY) * (1 / $zoom)
	}

	// TODO: fix zoom
	function wheel(e: any) {
		if ($selectedElement) return

		// let layer = { x: layerX, y: layerY }

		$zoom = $zoom || 1
		$zoom += e.deltaY / -1000
		$zoom = Math.round(Math.min(Math.max(0.2, $zoom), 2) * 100) / 100

		// left = (layer.x / $zoom - (clientX)) * -1
		// top = (layer.y / $zoom - (clientY)) * -1
	}

</script>

<ZoomIndicator />
<section
	on:mousedown={onMouseDown}
	on:touchstart={onTouchStart}
	on:wheel|preventDefault={wheel}
	bind:this={board}
	style="left: {left}px; top: {top}px; transform: scale({$zoom});"
	class="select-none cursor-move fixed z-[-1] gradient"
>
	<slot />
</section>

<svelte:window
	on:mouseup={onMouseUp}
	on:touchend={onMouseUp}
	on:mousemove={onMouseMove}
	on:touchmove={onTouchMove}
/>

<style>
	.gradient {
		background-image: linear-gradient(45deg, black, slategray);
	}
</style>
