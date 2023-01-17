<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
	import { devicePixelRatio } from '$lib/stores/states'
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
	let box: any

	const onMouseDown = () => (moving = true)
	const onMouseUp = () => (moving = false)

	function onMouseMove(e: MouseEvent) {
		let boxBoundary = box.getBoundingClientRect()

		if ($selectedElement) {
			return
		}

		if (!moving) {
			return
		}
		const { innerWidth, innerHeight } = window
		const { x, y, right, bottom } = boxBoundary

		if (x < 0) {
			right < innerWidth
				? (left = innerWidth - boardWidth)
				: (left += e.movementX / $devicePixelRatio)
		} else {
			left = -1
		}

		if (y < 0) {
			bottom < innerHeight
				? (top = innerHeight - boardHeight)
				: (top += e.movementY / $devicePixelRatio)
		} else {
			top = -1
		}
	}
</script>

<section
	bind:this={box}
	on:mousedown={onMouseDown}
	style="left: {left}px; top: {top}px;"
	class="select-none cursor-move absolute bg-gradient-to-tl z-[-1] gradient"
>
	<slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.gradient {
		background-image: linear-gradient(45deg, black, slategray);
	}
</style>
