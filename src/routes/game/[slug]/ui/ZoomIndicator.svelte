<script>
	import { zoom } from '$lib/stores/states'
	import { fade } from 'svelte/transition'

	let valueChanged = false

	zoom.subscribe((value) => {
		// change valueChanged to true for 1000ms
		valueChanged = true
		setTimeout(() => {
			valueChanged = false
		}, 1000)
	})
</script>

<div class="text-white fixed ml-2 pointer-events-none transition-all duration-300">
	{#if valueChanged}
		<p out:fade={{ duration: 300 }}>{Math.round($zoom * 100)}%</p>
	{/if}
</div>
