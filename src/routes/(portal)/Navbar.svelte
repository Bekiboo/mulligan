<script lang="ts">
	export let session: any
</script>

<!-- Placeholder to account for Navbar height -->
<div class="h-[4.5rem] w-full" />

<div class="px-8 h-[4.5rem] flex justify-between items-center top-0 bg-slate-700 w-full absolute">
	<a href="/"><img class="h-10" src="/img/M-ulligan.svg" alt="Mulligan Logo" /></a>
	<div class="">
		{#if session}
			<a
				class="text-white bg-emerald-600 hover:bg-emerald-500 shadow-md active:shadow-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-100"
				href="/profile">Profile</a
			>
		{:else}
			<a
				class="text-white mr-2 hover:bg-slate-600 hover:shadow-md active:shadow-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-100"
				href="/signin">Sign In</a
			>
			<a
				class="text-white bg-emerald-600 hover:bg-emerald-500 shadow-md active:shadow-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center duration-100"
				href="/signup">Sign Up</a
			>
		{/if}
	</div>
</div>
