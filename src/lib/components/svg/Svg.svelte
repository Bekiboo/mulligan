<script lang="ts">
	export let size = 1.5
	export let paths: string[]
	export let rotation = 0
	export let stroke = 'currentColor'
	export let stroke_width = 1.5
</script>

<svg
	style="
      width: {size}rem;
      height: {size}rem;
      transform: rotate({rotation}deg);
      transition: transform 0.1s ease-in-out;"
	fill="none"
	{stroke}
	stroke-width={stroke_width}
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	{#each paths as path}
		<path stroke-linecap="round" stroke-linejoin="round" d={path} />
	{/each}
	<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">12</text>
</svg>

<style>
	text {
		color: black;
		font-family: 'Roboto', sans-serif;
		fill: black;
		stroke-width: 1;
		font-size: 0.6rem;
		text-shadow: 0 0 6px white;
	}
</style>
