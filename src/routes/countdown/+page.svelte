<script lang="ts">
	import Timer from './Timer.svelte';
	import { confetti } from '@neoconfetti/svelte'
	import { tick } from 'svelte';
	
    /**
     * @type {number}
     */
	let countFrom : number = (new Date(2024,5,15,12,0,0,0).valueOf() - Date.now().valueOf()) / 1000;
	let done : boolean = false;

	const confettiOpts = {
		particleCount: 300,
		force: 1,
		particleSize: 5
	};

	async function timesUp() {
		await tick();
		done = true;
	}

</script>

<div class="text-column">

    <span class="timer-container">
        <Timer {countFrom} on:timesup={timesUp} />
        {#if done}
            <span class="confetti" use:confetti={confettiOpts} />
        {/if}
    </span>

</div>
<div>
    <p class="credits">Timer component from <a href="https://webjose.hashnode.dev/animated-timer-the-svelte-experience">José Pablo Ramírez Vargas</a> </p>
</div>

<style>
	span.timer-container {
		position: relative;
	}

	span.confetti {
		position: absolute;
		left: 50%;
	}

    .credits {
        font-size: 0.8rem;
        text-align: right;
    }

</style>