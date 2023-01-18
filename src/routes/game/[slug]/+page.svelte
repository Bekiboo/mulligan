<script lang="ts">
	import Board from './../Board.svelte'
	import { supabase } from '$lib/db/supabase'
	import TokenComp from '$lib/components/elements/TokenComp.svelte'
	import { tokenTool } from '$lib/stores/toolbar'
	import { createElement } from '$lib/db/elementService'
	import { readable, get } from 'svelte/store'
	import { selectedElement } from '$lib/stores/elements'
	import ElementComp from '$lib/components/elements/ElementComp.svelte'
	import { zoom } from '$lib/stores/states'

	export let data: any

	const elements = readable(data.game, (set) => {
		supabase
			.from(`element`)
			.select()
			.eq('game_slug', data.slug)
			.then(({ error, data }) => set(data))

		const subscription = supabase
			.channel(data.slug)
			.on('postgres_changes', { event: '*', schema: 'public', table: 'element' }, (payload) => {
				// set([...get(elements), payload.new])
				switch (payload.eventType) {
					case 'INSERT':
						set([...get(elements), payload.new])
						break
					case 'UPDATE':
						set([
							...get(elements).map((element: Element) =>
								element.id === payload.new.id ? payload.new : element
							)
						])
						break
					case 'DELETE':
						set([...get(elements).filter((element: Element) => element.id !== payload.old.id)])
						break
					default:
						break
				}
			})
			.subscribe()
		// Unsubscribe from Supabase?
	})

	const boardDims: { width: number; height: number } = { width: 30000, height: 20000 }

	function handleBoardClick(e: any) {
		if ($selectedElement) {
			return
		}

		if ($tokenTool) {
			createElement(
				'token',
				data.slug,
				data.session.user.id,
				e.layerX * (1 / $zoom),
				e.layerY * (1 / $zoom)
			)
			return
		}
	}
</script>

<Board boardWidth={boardDims.width} boardHeight={boardDims.height}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		style="width:{boardDims.width}px;height:{boardDims.height}px"
		on:contextmenu|preventDefault={handleBoardClick}
		on:click={handleBoardClick}
	>
		{#each $elements as element}
			<ElementComp {element} />
		{/each}
	</div>
</Board>
