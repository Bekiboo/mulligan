<script>
	import Navbar from "./Navbar.svelte"

</script>


<Navbar />

<section class="bg-slate-800 h-screen">
	<div class="flex flex-col items-center justify-center px-6 mx-auto h-screen text-white">
		<slot />
	</div>
</section>