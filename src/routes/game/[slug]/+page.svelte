<script lang="ts">
	import Board from './Board.svelte'
	import { readable, get } from 'svelte/store'
	import { brdElemList } from '$lib/stores/brdElem'
	import BrdElemComp from './brdElems/BrdElemComp.svelte'
	import { movingBrdElem } from '$lib/stores/states'
	import { onMount } from 'svelte'
	import type { BrdElem } from '$lib/types'
	import type { PageData } from './$types'

	export let data: PageData
	const { supabase, slug, game } = data
	const { session }: any = data

	export const brdElems = readable(game, (set) => {
		supabase
			.from(`element`)
			.select()
			.eq('game_slug', slug)
			.then(({ data }) => {
				if (data !== null) {
					set(data as BrdElem[])
				}
			})

		const subscription = supabase
			.channel(slug)
			// listen to postgres changes on the 'brdElem' table where the id is the same as the game slug
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'element', filter: `game_slug=eq.${slug}` },
				(payload) => {
					switch (payload.eventType) {
						case 'INSERT':
							set([...get(brdElems), payload.new as BrdElem])
							break
						case 'UPDATE':
							// set movingbrdElem for animation
							movingBrdElem.set(payload.new.id)
							setTimeout(() => movingBrdElem.set(null), 500)
							set([
								...get(brdElems).map((brdElem: BrdElem) =>
									brdElem.id === payload.new.id ? (payload.new as BrdElem) : brdElem
								)
							])

							break
						case 'DELETE':
							console.log('delete', payload)

							set([...get(brdElems).filter((brdElem: BrdElem) => brdElem.id !== payload.old.id)])
							break
						default:
							break
					}
				}
			)
			.subscribe()
		// TODO: Unsubscribe from Supabase?
	})

	brdElems.subscribe((brdElems) => {
		console.log('brdElems', brdElems)

		brdElemList.set(brdElems)
	})

	onMount(() => {
		// stops the page from reloading when panning down on mobile
		document.documentElement.style.setProperty('overscroll-behaviour', 'contain')
		return () => document.documentElement.style.removeProperty('overscroll-behaviour')
	})

	const boardDims: { width: number; height: number } = { width: 30000, height: 20000 }
</script>

<Board boardWidth={boardDims.width} boardHeight={boardDims.height} {supabase} {slug} {session}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div style="width:{boardDims.width}px;height:{boardDims.height}px">
		{#each $brdElemList as brdElem}
			<BrdElemComp {supabase} {brdElem} />
		{/each}
	</div>
</Board>
