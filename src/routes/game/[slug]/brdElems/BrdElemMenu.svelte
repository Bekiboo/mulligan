<script lang="ts">
	export let brdElemCompWidth: number

	let menuWidth: number
</script>

<div
	bind:clientWidth={menuWidth}
	class="h-4 bg-white absolute"
	style="left: {brdElemCompWidth / 2 - menuWidth / 2}px"
>
	{brdElemCompWidth}
</div>
