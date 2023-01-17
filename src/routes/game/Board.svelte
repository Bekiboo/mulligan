<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
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

	const onMouseUp = () => (moving = false)

	function onMouseMove(e: MouseEvent) {
		if ($selectedElement) return

		if (!moving) return

		left = originalLeft + (e.clientX - originalX)
		top = originalTop + (e.clientY - originalY)
	}

	function onTouchMove(e:any) {
		console.log(e);

		if ($selectedElement) return

		if (!moving) return

		left = originalLeft + (e.touches[0].clientX - originalX)
		top = originalTop + (e.touches[0].clientY - originalY)


	}
</script>

<section
	on:mousedown={onMouseDown}
	on:touchstart={onTouchStart}
	style="left: {left}px; top: {top}px;"
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
