<script lang="ts">
	import Board from './Board.svelte'
	import { supabase } from '$lib/db/supabase'
	import { readable, get } from 'svelte/store'
	import { elementList } from '$lib/stores/elements'
	import ElementComp from './elements/ElementComp.svelte'
	import { movingElement } from '$lib/stores/states'
	import { onMount } from 'svelte'

	export let data: any

	export const elements = readable(data.game, (set) => {
		supabase
			.from(`element`)
			.select()
			.eq('game_slug', data.slug)
			.then(({ error, data }) => set(data))

		const subscription = supabase
			.channel(data.slug)
			// listen to postgres changes on the 'element' table where the id is the same as the game slug
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'element', filter: `game_slug=eq.${data.slug}` },
				(payload) => {
					switch (payload.eventType) {
						case 'INSERT':
							set([...get(elements), payload.new])
							break
						case 'UPDATE':
							// set movingelement for animation
							movingElement.set(payload.new.id)
							setTimeout(() => movingElement.set(null), 500)
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
				}
			)
			.subscribe()
		// TODO: Unsubscribe from Supabase?
	})

	elements.subscribe((elements) => {
		elementList?.set(elements)
	})

	onMount(() => {
		// stops the page from reloading when panning down on mobile
		document.documentElement.style.setProperty('overscroll-behaviour', 'contain')
		return () => document.documentElement.style.removeProperty('overscroll-behaviour')
	})

	const boardDims: { width: number; height: number } = { width: 30000, height: 20000 }
</script>

<Board boardWidth={boardDims.width} boardHeight={boardDims.height} {data}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div style="width:{boardDims.width}px;height:{boardDims.height}px">
		{#each $elementList as element}
			<ElementComp {element} />
		{/each}
	</div>
</Board>
