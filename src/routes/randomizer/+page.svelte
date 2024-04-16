<script>
	import { studentNames } from '$lib/data.js';
    import { shuffle } from '$lib/utils.js';

    let chosenName;
    let firstTime = true;
    let names = [...studentNames];

    function startOver() 
    {
        names = [...studentNames];
        firstTime = true;
        chosenName = null;
    }

    function pickName() 
    {
        if(firstTime)
        {
            // shuffle the list of names in studentNames
            shuffle(names);
            firstTime = false;
        }
        chosenName = names.pop() ?? "-- No more names --";
        names = [...names];
    }
</script>
	
<svelte:head>
    <title>Randomizer</title>
    <meta name="description" content="Randomly pick names" />
</svelte:head>

<div class="text-column">
    <h1>Who's up next?</h1>
    
    {#if names.length > 0 }
    <button type="button" on:click={pickName}>
        Run
    </button>
    {:else}
    <button type="button" on:click={startOver}>
        Start Over
    </button>
    {/if}
</div>
<div class="text-column">
    <p class="winner">{chosenName ?? ''}</p>
</div>
<div>
    <p>Names left: {names.length}</p>
    <!--Display names in a list-->
    <ul>
        {#each names as name}
            <li>{name}</li>
        {/each}
    </ul>
</div>

<style>
    .winner {
        font-size: 2em;
        font-weight: bold;
        color: #ff0000;
    }
</style>