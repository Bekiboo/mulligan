<script lang="ts">
	import Board from '../Board.svelte'
	import { supabase } from '$lib/db/supabase'
	import TokenComp from '$lib/components/elements/TokenComp.svelte'
	import { tokenTool } from '$lib/stores/toolbar'
	import { createElement } from '../handleClick'
	// import type { BoardStateMessage } from '$lib/types';
	import { readable, get } from 'svelte/store'

	export let data: any
	console.log(data.game)

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

	let m = { x: 0, y: 0 }

	async function onRightClick(e: any) {
		let boxBoundary = e.path[0].getBoundingClientRect()
		m.x = e.clientX - boxBoundary.x
		m.y = e.clientY - boxBoundary.y
	}

	function handleBoardClick(e: any) {
		let boxBoundary = e.path[0].getBoundingClientRect()
		m.x = e.clientX - boxBoundary.x
		m.y = e.clientY - boxBoundary.y

		if ($tokenTool) createElement(e, 'token', data.slug)
	}
</script>

<Board boardWidth={boardDims.width} boardHeight={boardDims.height}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		style="width:{boardDims.width}px;height:{boardDims.height}px"
		on:contextmenu|preventDefault={onRightClick}
		on:click={handleBoardClick}
	>
		{#each $elements as element}
			{#if element.type == 'token'}
				<TokenComp token={element} />
			{/if}
		{/each}
	</div>
</Board>
