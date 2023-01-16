<script lang='ts'>
	import Navbar from './Navbar.svelte'

	export let data: any	
</script>

<Navbar session={data.session} />

<section class="bg-slate-800 h-screen">
	<div class="flex flex-col items-center justify-center px-6 mx-auto h-screen text-white">
		<slot />
	</div>
</section>
