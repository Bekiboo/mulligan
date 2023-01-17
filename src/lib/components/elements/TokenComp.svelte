<script lang="ts">
	import { selectedElement } from '$lib/stores/elements'
	import type { Token } from '$lib/types'
	import { getCenter } from '$lib/utils'
	import { updateElementPos } from '$lib/db/elementService'
	import { onMount } from 'svelte'
	import { devicePixelRatio } from '$lib/stores/states'

	export let token: Token
	let element: HTMLElement
	let middleX: number
	let middleY: number

	onMount(() => {
		middleX = getCenter(element).middleX
		middleY = getCenter(element).middleY
	})

	let currentPos: { x: number; y: number; z: number }

	const onTouchStart = (e: TouchEvent) => {
		e.preventDefault()
		console.log('touchstart');
		
	}

	const onMouseDown = () => {
		selectedElement.set(token.id)
		let x = token.pos.x
		let y = token.pos.y
		let z = token.pos.z
		currentPos = { x, y, z }
	}
	const onMouseUp = () => {
		selectedElement.set(null)

		if (currentPos.x == token.pos.x && currentPos.y == token.pos.y) {
			return
		}		

		updateElementPos(token)
	}

	function onMouseMove(e: MouseEvent) {
		if ($selectedElement == token.id) {
			token.pos.x += e.movementX / $devicePixelRatio
			token.pos.y += e.movementY / $devicePixelRatio
		}
	}
</script>

<div
	bind:this={element}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
	on:touchstart={onTouchStart}
	on:touchend={onMouseUp}
	style="transform:translate({token.pos.x - middleX}px,{token.pos.y - middleY}px);z-index:{token.pos
		.z};"
	class="bg-red-500 rounded-full w-10 h-10 absolute"
/>

<svelte:window on:mousemove={onMouseMove} />
