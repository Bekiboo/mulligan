<script lang="ts">
	import { tokenTool } from '$lib/stores/toolbar'
</script>

<div class="px-8 w-32 flex justify-between items-center right-0 bg-slate-700 h-screen fixed">
	<button on:click={() => tokenTool.set(!$tokenTool)} class:bg-blue-500={$tokenTool} class="rounded-full p-2 bg-slate-800">
		<svg
			class="text-white h-10"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
			/>
		</svg>
	</button>
</div>
