<script lang="ts">
	import Board from '$lib/Board.svelte';
	import { tokenList } from '$lib/stores/elements';
	import { addToken } from '$lib/stores/toolbar';

	let tokens: any;
	// : {x: number, y:number}[];

	tokenList.subscribe((value) => {
		tokens = value;
	});

	let addTokenActive = false;
	addToken.subscribe((value) => {
		addTokenActive = value;
	});

	let box: any;
	const boardDims: { width: number; height: number } = { width: 30000, height: 20000 };

	let m = { x: 0, y: 0 };
	let boardScale: number = 20;

	function wheel(event: any) {
		// if (event.deltaY > 0 && boardScale > 11) {
		// 	boardScale -= 1;
		// } else if (boardScale < 30) {
		// 	boardScale += 1;
		// }
		// console.log(boardScale);
	}

	function handleMousemove(event: MouseEvent) {
		let boxBoundary = box.getBoundingClientRect();
		m.x = event.clientX - boxBoundary.x;
		m.y = event.clientY - boxBoundary.y;
	}

	function handleBoardClick(event: any) {
		if (addTokenActive) {
			$tokenList = [
				...$tokenList,
				{
					x: event.layerX,
					y: event.layerY,
					z: Math.round(Math.random() * 1000000)
				}
			];
			console.log(tokens);

			// addToken.set(false)
		}
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
			{#each tokens as token}
				<div style="transform:translate({token.x - 20}px,{token.y - 20}px);z-index:{token.z};position:absolute" class="bg-red-500 rounded-full w-10 h-10"></div>
			{/each}

			<!-- <div style="transform:translate({m.x}px,{m.y}px)">
				{m.x} x {m.y}
			</div> -->
		</div>
	</Board>
</div>
