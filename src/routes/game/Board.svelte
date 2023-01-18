<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
	import { zoom } from '$lib/stores/states'
	import { onMount } from 'svelte'

	export let boardWidth: number
	export let boardHeight: number
	let windowWidth: number
	let windowHeight: number
	let left: number
	let top: number

	onMount(() => {
		windowWidth = window.innerWidth
		windowHeight = window.innerHeight
		left = (boardWidth - windowWidth) / -2
		top = (boardHeight - windowHeight) / -2
	})

	let moving = false
	let originalX: number
	let originalY: number
	let originalLeft: number
	let originalTop: number

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

	function onMouseMove(e: MouseEvent) {
		if ($selectedElement) return

		if (!moving) return

		left = originalLeft + (e.clientX - originalX) * (1 / $zoom)
		top = originalTop + (e.clientY - originalY) * (1 / $zoom)
	}

	function onTouchMove(e:any) {
		if ($selectedElement) return

		if (!moving) return

		left = originalLeft + (e.touches[0].clientX - originalX) * (1 / $zoom)
		top = originalTop + (e.touches[0].clientY - originalY) * (1 / $zoom)
	}

	function wheel(e: any) {
		$zoom = $zoom || 1
		$zoom += e.deltaY / -1000
		$zoom = Math.round(Math.min(Math.max(0.1, $zoom), 4) *100 ) / 100
		// adjust left postion to zoom where the mouse is
		// left += e.clientX * $zoom 
		// top += e.clientY * $zoom
	}

</script>
<div class="text-white">{$zoom}</div>
<section
	on:mousedown={onMouseDown}
	on:touchstart={onTouchStart}
	on:wheel|preventDefault={wheel}
	style="left: {left}px; top: {top}px; zoom: {$zoom}"
	class="select-none cursor-move fixed bg-gradient-to-tl z-[-1] gradient"
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
