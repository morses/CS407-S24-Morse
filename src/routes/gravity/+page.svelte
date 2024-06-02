
<h1>Physics Motion: Gravity</h1>
<section>
    <article class="controls">
        <p>Controls</p>
        
        <button type="button" on:click={animateHandler}>
            {@html running ? 'Stop&nbsp;' : 'Start'} Animation
        </button>
        <button type="button" on:click={wireframeHandler}>
            {@html wireframe ? 'Hide&nbsp;' : 'Show'} Wireframe
        </button>
        <hr>
        <label>
            <input type="checkbox" bind:checked={ambientLight} on:change={updateLighting} />
            Ambient
        </label>
        <label>
            <input type="checkbox" bind:checked={pointLight} on:change={updateLighting} />
            Point
        </label>
    </article>
    <article class="graphics">
        <code>{Math.round(fps)} FPS</code>
            <canvas
            bind:this={canvas}
            tabindex="0"
            on:keydown={onKeyDown}
            width={width} 
            height={height}
        />
    </article>
    <article class="description">
        <p>Example of implementing physically realistic motion:</p>
        <ul>
            <li>Floor is 100m square</li>
            <li>Balls are 2m in diameter and all have the same mass</li>
            <li>Initial velocity of balls is 15m/s (33mph) in the direction the camera is looking</li>
            <li>Gravity is 9.81m/s<sup>2</sup> in the negative y direction</li>
            <li>Friction through the air is simulated with a decay proportional to velocity (no friction on surfaces)</li>
            <li>Balls bounce off walls and the floor and lose some energy when they do</li>
            <li>Balls bounce off each other with perfectly elastic collisions</li>
            <li>No rolling or spinning is implemented</li>
        </ul>
        <p>Controls:</p>
        <ul>
            <li>WASD for camera movement</li>
            <li>R move up</li>
            <li>F move down</li>
            <li>Left mouse click to move forward</li>
            <li>Right mouse click to move backward</li>
            <li>T to fire a new ball</li>
            <li>G to delete the oldest ball</li>
        </ul>
    </article>
</section>

<style>
    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    article {
        flex: 200px;
        margin: 20px;
    }

    .controls {
        flex: 1;
        display: inline-block;
        margin-bottom: 20px;
    }

    .controls p {
        border-bottom: 2px solid #8c8e94;
        text-align: center;
        text-transform: uppercase;
    }

    .controls button {
        margin-top: 10px;
    }

    .controls label {
        display: block;
        margin-top: 10px;
    }

    .control-item {
        margin-top: 10px;
    }

    .graphics {
        flex: 4;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
    }

    .description {
        flex: 2 200px;
    }

    button {
        background: steelblue;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
    } 
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { World } from './world/World.js';

    const width = 1024;
    const height = 768;
    let fps = 0;

    let running = true;
    let wireframe = false;

    let ambientLight = true;
    let pointLight = true;
    let hex = '#ffd700';
    let canvas : HTMLCanvasElement;
    let world : World;

    onMount(() => {
        console.log('onMount: building scene');
        canvas.focus();
        world = new World(canvas);
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();            
        }, 2000);
    });

    function onKeyDown(event: KeyboardEvent) {
        world.onKeyDown(event);
    }

    // Update our lighting based on the checkboxes
    function updateLighting() {
        world.setAmbientLight(ambientLight);
        world.setPointLight(pointLight);
        world.render(); // don't assume it's animating and rendering
        canvas.focus();
    }

    // Animate button click event handler
    function animateHandler() {
        running ? world.stop() : world.start();
        running = !running;
        canvas.focus();
    }

    // Wireframe button click event handler
    function wireframeHandler() {
        wireframe = !wireframe;
        world.setWireframe(wireframe);
        world.render();
        canvas.focus();
    }
</script>
