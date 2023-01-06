<!-- https://www.youtube.com/watch?v=ShPPkZEeLPo -->
<script lang="ts">
	import { onMount } from "svelte"
	import { getMiddleOfElement } from "$lib/utils"

	let items = [
		{ name: 'Home', href: '/', color: 'bg-red-500' },
		{ name: 'About', href: '/about', color: 'bg-blue-500' },
		{ name: 'Contact', href: '/contact', color: 'bg-green-500' },
		{ name: 'Blog', href: '/blog', color: 'bg-yellow-500' },
		{ name: 'Settings', href: '/settings', color: 'bg-purple-500' },
		{ name: 'Logout', href: '/logout', color: 'bg-pink-500' }
	]

	let element: HTMLElement;
	let middleX: number;
	let middleY: number;

	onMount(() => {
		middleX = getMiddleOfElement(element).middleX
		middleY = getMiddleOfElement(element).middleY
	})

	export let pos: any
	let open = false
</script>

<div bind:this={element} class="relative w-48 h-48 bg-green flex justify-center items-center z-[1000000000]"
class:open="{open === true}"
style="transform:translate({pos.x - middleX}px,{pos.y - middleY}px)">
	<ul on:contextmenu={() => {open = true; console.log(open)}} class="absolute w-14 h-14 bg-white flex justify-center items-center rounded-full cursor-pointer shadow-sm">
		{#each items as item, i}
			<li class="absolute {item.color} h-10 w-10 rounded-full" style="transform: rotate({(i * 360) / items.length}deg)">
				<div>{item.name}</div>
			</li>
		{/each}
	</ul>
</div>

