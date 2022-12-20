<script lang="ts">
	import { onMount } from 'svelte';

	export let boardWidth: number;
	export let boardHeight: number;
	let windowWidth: number;
	let windowHeight: number;
	let left: number;
	let top: number;

	onMount(() => {
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		left = (boardWidth - windowWidth) / -2;
		top = (boardHeight - windowHeight) / -2;
	});

	let moving = false;
	let box: any;

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e: MouseEvent) {
		let boxBoundary = box.getBoundingClientRect();
		if (moving) {
			const { innerWidth, innerHeight } = window;
			const { x, y, right, bottom } = boxBoundary;

			if (x < 0) {
				if (right < innerWidth) {
					left = innerWidth - boardWidth;
				}
				left += e.movementX;
			} else {
				left = -1;
			}

			if (y < 0) {
				if (bottom < innerHeight) {
					top = innerHeight - boardHeight;
				}
				top += e.movementY;
			} else {
				top = -1;
			}
		}
	}

	function onMouseUp() {
		moving = false;
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
		background-image: linear-gradient(45deg, red, yellow);
	}
</style>
