<script lang="ts">
	import type { Token } from '$lib/types'

	export let brdElem: Token
	export let selected: boolean

	// check if brdElem is selected
</script>

<div
	class="bg-red-500 rounded-full w-10 h-10 text-white text-center pt-2 font-bold"
	aria-label="element"
	class:selected
/>

<style>
	.selected {
		outline: 2px solid white;
	}
</style>
