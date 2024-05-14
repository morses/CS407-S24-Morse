
<h1>Shaders!</h1>
<div class="center-container">
    <label for="vertexShader" class="centered-label">Vertex Shader</label>
    <textarea id="vertexShader" class="centered-textarea" bind:value={vertexShaderText} rows="10" cols="100"></textarea>
</div>
<div class="center-container">
    <label for="fragmentShader" class="centered-label">Fragment Shader</label>
    <textarea id="fragmentShader" class="centered-textarea" bind:value={fragmentShaderText} rows="10" cols="100"></textarea>
</div>

<section>
    <button type="button" on:click={compileShaders}>Compile and Use Shaders</button>
</section>
<section>
    <article class="controls">
        <p>Controls</p>
        <button type="button" on:click={wireframeHandler}>
            {@html wireframe ? 'Hide&nbsp;' : 'Show'} Wireframe
        </button>
        <hr>
        <div class="control-item">
            <ColorPicker 
                bind:hex 
                on:input={updateColor}
                isAlpha={false}
            />
        </div>
    </article>
    <article class="graphics">
        <code>{Math.round(fps)} FPS</code>
            <canvas
            bind:this={canvas}
            tabindex="0"
            width={width} 
            height={height}
        />
    </article>
    <article class="description">
        <p>The goal of this assignment is to ...</p>  <p>Requirements are:</p>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <p>Use the mouse to orbit and pan the camera: left mouse click (hold down) or single finger swipe to orbit, right mouse click (hold down), arrow keys, or two-finger swipe to pan; zoom with the scroll wheel or pinch gesture.</p>
    </article>
</section>
<div>
    <h2 class="center-container">Blinn-Phong</h2>
    <p>Built-in uniforms and attributes: <a href="https://threejs.org/docs/index.html#api/en/renderers/webgl/WebGLProgram">WebGLProgram</a></p>
    <Highlight language={glsl} code={vertexShaderPhong} />
    <Highlight language={glsl} code={fragmentShaderPhong} />
</div>
<style>
    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: center;
        align-items: center;
    }

    .center-container {
        text-align: center;
    }

    .centered-label {
        display: block;
        margin-bottom: 10px;
        font-size: 1.2em;
    }

    .centered-textarea {
        width: 100%;
        max-width: 800px;
        height: 150px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
        box-sizing: border-box;
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

<svelte:head>
    {@html github}
</svelte:head>

<script lang="ts">
    import { onMount } from 'svelte';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { World } from './world/World.js';
    import Highlight from 'svelte-highlight';
    import glsl from 'svelte-highlight/languages/glsl';
    import github from 'svelte-highlight/styles/github';
    
    console.log('script executing');

    const width = 800;
    const height = 600;
    let fps = 0;

    let vertexShaderText = `
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
    let fragmentShaderText = `
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;

    let wireframe = false;

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

    function compileShaders() {
        console.log(`vertexShaderText = ${vertexShaderText}`);
        console.log(`fragmentShaderText = ${fragmentShaderText}`);
        world.updateShaders(vertexShaderText, fragmentShaderText);
    }


    // Update color of the torus
    function updateColor() {
        //console.log('updateColor: hex = ' + hex);
        // For some reason, the first time this is called, hex is missing the leading '#'
        let newColor : string = hex;
        if(newColor.startsWith('#') == false) {
            newColor = '#' + newColor;
        }
        // Also, threejs doesn't take alpha values so truncate to 7 characters
        newColor = hex.substring(0, 7); // still not understanding something as this isn't working, will just disable alpha for now
        world.setColor(newColor);
        world.render();
        canvas.focus();
    }

    // Wireframe button click event handler
    function wireframeHandler() {
        wireframe = !wireframe;
        world.setWireframe(wireframe);
        world.render();
        canvas.focus();
    }

    let vertexShaderPhong = `
    varying vec3 vViewPosition;
    void main() {
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
    }
    `;

    let fragmentShaderPhong = `
    uniform vec3 diffuse;
    uniform vec3 emissive;
    uniform vec3 specular;
    uniform float shininess;
    uniform float opacity;

    void main() {
        vec4 diffuseColor = vec4( diffuse, opacity );
        ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	    vec3 totalEmissiveRadiance = emissive;
        vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
        gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    }
    `;
</script>
