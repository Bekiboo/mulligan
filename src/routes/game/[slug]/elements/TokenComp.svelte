<script lang="ts">
	import { selectedElements } from '$lib/stores/elements'
	import type { Element } from '$lib/types'

	export let element: Element
	export let selected: boolean

	// check if element is selected
</script>

<div
	class="bg-red-700 rounded-full w-10 h-10 text-white text-center pt-2 font-bold"
	aria-label="element"
	class:selected
>
	{element.id}
</div>

<style>
	.selected {
		outline: 2px solid white;
	}
</style>
