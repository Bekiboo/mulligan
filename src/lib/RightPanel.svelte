<script lang="ts">
	import { addToken } from './stores/toolbar';

	let addTokenActive: boolean = false;
	addToken.subscribe((value) => {
		addTokenActive = value;
	});
</script>

<div class="right-0 w-20 bg-green-500 h-screen absolute">
	<button on:click={() => addToken.set(!addTokenActive)} class:bg-blue-500={addTokenActive}>
		Add Token
	</button>
</div>
