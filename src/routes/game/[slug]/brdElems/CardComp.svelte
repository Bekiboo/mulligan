<script lang="ts">
	import Svg from '$lib/components/svg/Svg.svelte'
	import { shieldSvg, swordsSvg, trashSvg } from '$lib/components/svg/svgPathList'
	import type { Card } from '$lib/types'

	export let brdElem: Card
	export let selected: boolean

	// check if brdElem is selected
</script>

<div
	class="bg-blue-500 w-[125px] h-[175px] rounded-2xl text-white text-center font-bold"
	aria-label="element"
	class:selected
>
	<Svg paths={shieldSvg} size={2.5} stroke_width={1} />
	<Svg paths={swordsSvg} size={2.5} stroke_width={1} />
</div>

<style>
	.selected {
		outline: 2px solid white;
	}
</style>
