
<h1>Hello World using three.js</h1>
<section>
    <article class="controls">
        <button type="button" on:click={animateHandler}>
            {@html running ? 'Stop&nbsp;' : 'Start'} Animation
        </button>
        <button type="button" on:click={wireframeHandler}>
            {@html wireframe ? 'Hide&nbsp;' : 'Show'} Wireframe
    </article>
    <article class="graphics">
        <canvas
            bind:this={canvas}
            width={width} 
            height={height}
        />
    </article>
    <article class="description">
        <p>The goal of this assignment is to <em>prove the architecture</em> we'll be using to display WebGL 3D graphics in a web application.  We want to show that we can successfully:</p>
        <ul>
            <li>Use the three.js library to create a 3D scene</li>
            <li>Render the scene to a canvas element</li>
            <li>Control the animation of the scene</li>
            <li>All in a Svelte app</li>
            <li>Deployed to the Web</li>
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

    .controls button {
        margin: 10px;
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

<script>
    import * as THREE from 'three';
    import { onMount } from 'svelte';

    console.log('script executing');

    const width = 800;
    const height = 600;

    let running = false;
    let wireframe = false;
    let canvas;
    let drawFrame = () => {};
    let animate = () => {};

    // Animate button click event handler
    function animateHandler() {
        running = !running;
        if(running)
        {
            animate();
        }
    }

    // Wireframe button click event handler
    function wireframeHandler() {
        wireframe = !wireframe;
        drawFrame();
    }

    onMount(() => {
        console.log('onMount: building scene');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('skyblue');

        const camera = new THREE.PerspectiveCamera( 35, width / height, 0.1, 100 );
        camera.position.z = 10;

        const geometry = new THREE.OctahedronGeometry( 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x229933 } );
        material.wireframe = false;
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas});
        renderer.setSize( width, height );
        renderer.setPixelRatio( window.devicePixelRatio);

        // Do anything we need to do before rendering a single frame
        drawFrame = () => {
            material.wireframe = wireframe;
            renderer.render( scene, camera );
        }

        animate = () => {
            if (running)
            {
                requestAnimationFrame( animate );
            }
            else
            {
                renderer.render( scene, camera );
                return;
            }
            
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            drawFrame();
        }
        animate();
    });

</script>

