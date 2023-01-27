<script lang="ts">
	import { deleteElement } from '$lib/db/elementService'
	import { elementList, selectedElements } from '$lib/stores/elements'
	import { hoveringTrash } from '$lib/stores/states'
	import { fade } from 'svelte/transition'
	import { onDestroy } from 'svelte'

	let elementsToDelete: any = null

	function mouseUp() {
		// first delete element in client, then in db
		elementList?.update((elements: any) =>
			elements.filter((element: Element) => element.id !== elementsToDelete.id)
		)
		deleteElement(elementsToDelete)
	}

	function mouseOver() {
		// map selectedElements ids to elementsToDelete
		elementsToDelete = $selectedElements?.map((element: Element) => element.id)
		console.log(elementsToDelete);
		$hoveringTrash = true		
	}

	onDestroy(() => {
		$hoveringTrash = false
	})
</script>

<!-- create element to delete selected element on hover -->
<div class="fixed flex h-screen items-center right-20 pointer-events-none">
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div
		class="glass right-12 md:w-16 w-12 p-2 z-50 bg-slate-900 text-gray-300 hover:text-gray-50 rounded-full hover:scale-125 duration-100 pointer-events-auto"
		in:fade={{ duration: 300, easing: (t) => t * t * t }}
		out:fade={{ duration: 300, easing: (t) => t * t * t }}
		on:mouseover={mouseOver}
		on:mouseup={mouseUp}
		on:mouseleave={() => ($hoveringTrash = false)}	
	>
		<svg
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
				d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
			/>
		</svg>
	</div>
</div>

<style>
    .glass {
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(8.2px);
		-webkit-backdrop-filter: blur(8.2px);
	}
</style>