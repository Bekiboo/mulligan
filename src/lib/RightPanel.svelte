<script lang="ts">
	import { tokenTool } from './stores/toolbar';
</script>

<div class="right-0 w-20 bg-green-500 h-screen absolute">
	<button on:click={() => tokenTool.set(!$tokenTool)} class:bg-blue-500={$tokenTool}>
		Add Token
	</button>
</div>
