<script lang="ts">
	import type { BrdElem } from '$lib/types'

	export let brdElem: BrdElem
	export let selected: boolean

	// check if brdElem is selected
</script>

<div
	class="bg-red-700 w-32 h-48 rounded-2xl text-white text-center pt-2 font-bold"
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
