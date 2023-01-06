<script lang="ts">
	import { tokenTool } from '$lib/stores/toolbar'

	export let isUser: boolean = false
</script>

<div class="right-0 bg-slate-700 h-screen absolute" style="width:160px;">
	{#if !isUser}
		<img class="h-50" src="/img/mulligan.svg" alt="" />
		<a href="/signup">Sign Up</a>
		<a href="/signin">Sign In</a>
	{/if}
	<button on:click={() => tokenTool.set(!$tokenTool)} class:bg-blue-500={$tokenTool}>
		Add Token
	</button>
</div>
