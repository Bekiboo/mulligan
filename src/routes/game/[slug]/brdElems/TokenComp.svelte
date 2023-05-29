<script lang="ts">
	import type { BrdElem } from '$lib/types'

	export let brdElem: BrdElem
	export let selected: boolean

	// check if brdElem is selected
</script>

<div
	class="bg-red-700 rounded-full w-10 h-10 text-white text-center pt-2 font-bold"
	aria-label="element"
	class:selected
>
	{brdElem.id}
</div>

<style>
	.selected {
		outline: 2px solid white;
	}
</style>
