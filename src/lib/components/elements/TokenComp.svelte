<script lang="ts">
	import { selectedElements } from '$lib/stores/elements'
	import type { Element } from '$lib/types'

	export let element: Element

	// check if element is selected
	$: selected = $selectedElements.some((el: Element) => el.id == element.id)
</script>

<div class="bg-red-700 rounded-full w-10 h-10 text-white text-center pt-2 font-bold" aria-label="element" class:selected>
</div>

<style>
	.selected {
		outline: 2px solid white;
	}
</style>
