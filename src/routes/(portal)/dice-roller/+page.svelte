<!-- This page is to make a highly customizable dice roller. -->
<script lang="ts">
	import { fly } from 'svelte/transition'

	class die {
		color: string
		result: number
		constructor(
			public sides: number,
			public name: string
		) {
			this.color = 'white'
			this.result = 0
		}

		roll() {
			this.reset()
			dice = dice

			// wait for the dice to reset
			setTimeout(() => {
				this.result = Math.floor(Math.random() * this.sides) + 1
				dice = dice
			}, 100)
		}

		reset() {
			this.result = 0
			dice = dice
		}
	}

	let dice: die[] = [new die(6, 'd6'), new die(6, 'd6'), new die(6, 'd6')]

	function roll() {
		for (let die of dice) {
			die.roll()
		}
	}

	function reset() {
		for (let die of dice) {
			die.reset()
		}
	}
</script>

<div class="flex flex-col gap-8 select-none w-48">
	<div>
		<h2>Dice Pool</h2>
		<div class="flex flex-wrap gap-2">
			{#each dice as die}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="h-6 w-6 rounded text-black flex items-center font-bold justify-center cursor-pointer"
					style="background: {die.color}"
				>
					{die.name}
				</div>
			{/each}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="h-6 w-6 rounded text-slate-500 text-2xl border-slate-500
                border flex items-center justify-center cursor-pointer hover:border-slate-300
                hover:text-slate-300 duration-100 pb-[.13rem]"
				on:click={() => (dice = [...dice, new die(6, 'd6')])}
			>
				&#10010;
			</div>
		</div>
	</div>

	<div>
		<h2>Rolls</h2>
		<div class="flex flex-wrap gap-2 min-h-[4rem]">
			{#each dice as die}
				{#if die.result != 0}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						in:fly={{ y: 20, duration: Math.random() * 1000 }}
						class="h-6 w-6 rounded text-black cursor-pointer font-bold flex items-center justify-center"
						style="background: {die.color}"
						on:dblclick={() => die.roll()}
					>
						{die.result}
					</div>
				{:else}
					<div class="h-6 w-6 rounded text-black font-bold flex items-center justify-center">
						&nbsp;
					</div>
				{/if}
			{/each}
		</div>
		<button on:click={roll}>Roll</button>
		<button on:click={reset}>Reset</button>
	</div>
</div>
