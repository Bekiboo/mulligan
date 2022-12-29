<script lang="ts">
	import type { Token } from '$lib/types';

	export let token: Token;	
</script>

<div
	style="transform:translate({token.pos.x - 20}px,{token.pos.y - 20}px);z-index:{token.pos.z};position:absolute"
	class="bg-red-500 rounded-full w-10 h-10"
/>
