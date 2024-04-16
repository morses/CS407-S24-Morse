<script lang="ts">
// Timer from: https://webjose.hashnode.dev/animated-timer-the-svelte-experience
    import { readable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	// Props
	export let countFrom : number = 0;

	const dispatch = createEventDispatcher();

	// Reactive to account for changes in countFrom:
    /**
     * @type {Date}
     */
	$: endDate = (function(secs : number) : Date {
		const e = Date.now() + secs * 1000;
		return new Date(e);
	})(countFrom);
	
	$: remaining = readable(countFrom, function start(set) {
		const interval = setInterval(() => {
			let r : number = Math.round((endDate.valueOf() - new Date().valueOf()) / 1000);
			r = Math.max(r, 0);
			set(r);
			if (r <= 0) {
				clearInterval(interval);
			}
		}, 1000);
		
		return function stop() {
		clearInterval(interval);
		};
	});
	$: dd = Math.floor( $remaining / 86400 );
	$: hh = Math.floor(($remaining - dd * 86400 ) / 3600);
	$: mm = Math.floor(($remaining - dd * 86400 - hh * 3600) / 60);
	$: ss = Math.floor($remaining - dd * 86400 - hh * 3600 - mm * 60);

	$: if ($remaining === 0) {
		dispatch('timesup');
	}

	// Animation-related.
	const duration : number = 180;
	const delay : number = 90;
	
    /**
     * Format the value to have a leading zero if it is less than 10.
     * @param {number} value
     */
	function f(value : number) : string {
		if (value < 10) {
			return `0${value}`;
		}
		return value.toString();
	}
</script>

<span class="timer">
	<span class="value">
		{#key dd}
			<span in:fly={{ delay, duration, y: '1em'}} out:fly={{ duration, y: '-1em'}}>{f(dd)}</span>
		{/key}
	</span>:<span class="value">
		{#key hh}
			<span in:fly={{ delay, duration, y: '1em'}} out:fly={{ duration, y: '-1em'}}>{f(hh)}</span>
		{/key}
	</span>:<span class="value">
		{#key mm}
			<span in:fly={{ delay, duration, y: '1em'}} out:fly={{ duration, y: '-1em'}}>{f(mm)}</span>
		{/key}
	</span>:<span class="value">
		{#key ss}
			<span in:fly={{ delay, duration, y: '1em'}} out:fly={{ duration, y: '-1em'}}>{f(ss)}</span>
		{/key}
	</span>
</span>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Orbitron:wght@400..900&display=swap');

	span.timer {
		padding: 0.2em 0.2em;
	}
	span.value {
		display: inline-flex;
		flex-flow: column;
		height: 1em;
	}
	span.value > span {
		display: inline-block;
	}

    .timer {
		font-family: 'Major Mono Display', monospace;
		font-weight: 500;
        font-style: normal; 
		padding: 0 0.7em;
		border-radius: 0.3em;
		font-size: 5em;
		background-color: lightblue;
	}

</style>