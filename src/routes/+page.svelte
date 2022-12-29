<script lang="ts">
	import Board from '$lib/Board.svelte';
	import TokenComp from '$lib/elements/TokenComp.svelte';
	import { elementList } from '$lib/stores/elements';
	import { tokenTool } from '$lib/stores/toolbar';
	import { addToken } from './handleClick';

	// const io = require('socket.io')();

	// const socket = io()

	// socket.on('eventFromServer', (message: any) => {
	// 	console.log(message)
	// })

	let elements: any[] = [];

	elementList.subscribe((value) => {
		elements = value;
	});

	let box: any;
	const boardDims: { width: number; height: number } = { width: 30000, height: 20000 };

	let m = { x: 0, y: 0 };
	let boardScale: number = 20;

	// function wheel to zoom in and out on the board
	function wheel(event: WheelEvent) {
		event.preventDefault();
		const delta = Math.sign(event.deltaY);
		boardScale = Math.max(10, Math.min(boardScale + delta, 100));

		console.log(boardScale)
	}

	// function handleMousemove to track mouse movement

	function handleMousemove(event: MouseEvent) {
		let boxBoundary = box.getBoundingClientRect();
		m.x = event.clientX - boxBoundary.x;
		m.y = event.clientY - boxBoundary.y;
	}

	function handleBoardClick(event: any) {
		if ($tokenTool) $elementList = addToken(event, $elementList);		
	}
</script>

<div class="overflow-hidden">
	<Board boardWidth={boardDims.width} boardHeight={boardDims.height}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			style="width:{boardDims.width}px;height:{boardDims.height}px;zoom: {boardScale / 20}"
			bind:this={box}
			on:mousemove={handleMousemove}
			on:wheel={wheel}
			on:click={handleBoardClick}
		>
			{#each elements as element}
				{#if element.type == 'token'}
					<TokenComp token={element} />
				{/if}
			{/each}

			<!-- <div style="transform:translate({m.x}px,{m.y}px)">
				{m.x} x {m.y}
			</div> -->
		</div>
	</Board>
</div>
