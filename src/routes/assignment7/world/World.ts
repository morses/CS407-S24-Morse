import { createCamera } from './components/camera.js';
import { Sphere } from './components/Sphere.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { Controls }  from './systems/Controls.js';

import { AxesHelper, PerspectiveCamera, Light, Scene, WebGLRenderer, Mesh } from 'three';

class World {
    private camera : PerspectiveCamera;
    private lights : Light[];
    private scene : Scene;
    private renderer : WebGLRenderer;
    private sphere: Sphere;
    private loop: Loop;
    private controls : Controls;

    constructor(canvas : HTMLCanvasElement) {
        this.camera = createCamera();
        this.lights = createLights();
        this.scene = createScene();
        this.renderer = createRenderer(canvas);
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.controls = new Controls(this.camera, canvas);

        const axesHelper = new AxesHelper(8);

        this.sphere = new Sphere(4);
        this.scene.add(this.sphere);
        this.scene.add(axesHelper);
        this.lights.forEach(light => this.scene.add(light));

        this.loop.addUpdateable(this.controls); // for the camera controls

        // Not currently using the resizer as our canvas has a fixed size
        const resizer = new Resizer(canvas, this.camera, this.renderer);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    
    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    updateShaders(vertexShader: string, fragmentShader: string) {
        this.sphere.setVertexShader(vertexShader);
        this.sphere.setFragmentShader(fragmentShader);
    }

    setColor(hexValue : string)
    {
        this.sphere.setColor(hexValue);
    }

    getColor(): string
    {
        return this.sphere.getColor();
    }

    getFrameRate(): number {
        return this.loop.getFrameRate();
    }

    setWireframe(value: boolean) {
        this.sphere.setWireframe(value);
    }
}

export { World };