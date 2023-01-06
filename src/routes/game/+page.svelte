<script lang="ts">
	import Board from './Board.svelte'
	// import CircleMenu from '$lib/CircleMenu.svelte'
	import { supabase } from '$lib/db/supabase'
	import TokenComp from '$lib/components/elements/TokenComp.svelte'
	import { elementList } from '$lib/stores/elements'
	import { circleMenu, tokenTool } from '$lib/stores/toolbar'
	import { addToken } from './handleClick'
	// import type { BoardStateMessage } from '$lib/types';

	// Channel name can be any string.
	// Create channels with the same name for both the broadcasting and receiving clients.
	const channel = supabase.channel('room1')

	// Subscribe registers your client with the server
	channel.subscribe((status) => {
		console.log(status)

		if (status === 'SUBSCRIBED') {
			console.log('SUBSCRIVEFVDF')

			// now you can start broadcasting cursor positions
			setInterval(() => {
				channel.send({
					type: 'broadcast',
					event: 'cursor-pos',
					payload: { x: Math.random(), y: Math.random() }
				})
				console.log(status)
			}, 100)
		}
	})

	// Listen to broadcast messages.
	supabase
		.channel('room1')
		.on('broadcast', { event: 'cursor-pos' }, (payload) => console.log(payload))
		.subscribe((status) => {
			if (status === 'SUBSCRIBED') {
				// your callback function will now be called with the messages broadcast by the other client
			}
		})

	let elements: any[] = []

	elementList.subscribe((value) => {
		elements = value
	})

	const boardDims: { width: number; height: number } = { width: 30000, height: 20000 }

	let m = { x: 0, y: 0 }

	async function onRightClick(e: any) {
		let boxBoundary = e.path[0].getBoundingClientRect()
		m.x = e.clientX - boxBoundary.x
		m.y = e.clientY - boxBoundary.y
		circleMenu.set(!$circleMenu)
	}

	function handleBoardClick(e: any) {
		console.log(e);
		
		let boxBoundary = e.path[0].getBoundingClientRect()
		m.x = e.clientX - boxBoundary.x
		m.y = e.clientY - boxBoundary.y
		if ($tokenTool) $elementList = addToken(e, $elementList)
	}
</script>

<Board boardWidth={boardDims.width} boardHeight={boardDims.height}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		style="width:{boardDims.width}px;height:{boardDims.height}px"
		on:contextmenu|preventDefault={onRightClick}
		on:click={handleBoardClick}
	>
		{#each elements as element}
			{#if element.type == 'token'}
				<TokenComp token={element} />
			{/if}
		{/each}

		<!-- {#if $circleMenu}
			<CircleMenu pos={m} />
		{/if} -->
	</div>
</Board>
