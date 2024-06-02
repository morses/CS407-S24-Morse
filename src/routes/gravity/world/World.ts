import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { Floor } from './components/Floor.js';
import { Ball } from './components/Ball.js';
import { Collider } from './systems/Collider.js';

import { Controls }  from './systems/Controls.js';

import { PerspectiveCamera, Light, Scene, WebGLRenderer, Mesh, Vector3 } from 'three';

class World {
    private camera : PerspectiveCamera;
    private lights : Light[];
    private scene : Scene;
    private renderer : WebGLRenderer;
    private loop: Loop;
    private controls: Controls;
    private collider: Collider;
    
    private floor: Floor;
    private balls: Ball[] = [];

    constructor(canvas : HTMLCanvasElement) {
        this.camera = createCamera();
        this.lights = createLights();
        this.scene = createScene();
        this.renderer = createRenderer(canvas);
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.controls = new Controls(this.camera, canvas);
        this.collider = new Collider(this.balls);
        this.lights.forEach(light => this.scene.add(light));

        this.floor = new Floor();
        this.scene.add(this.floor);

        this.loop.addUpdateable(this.controls); // for the camera controls
        this.loop.addUpdateable(this.collider); // for the collision detection

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

    onKeyDown(event: KeyboardEvent) {
        if (event.key === 't') {
            this.shootNewBall();
        }
        else if (event.key === 'g') {
            this.removeBall(); 
        }
        this.render();
    }

    shootNewBall() {
        // Get position of the camera
        const cameraPosition: Vector3 = this.camera.position.clone();
        const cameraDirection: Vector3 = this.camera.getWorldDirection(new Vector3());
        console.log(cameraDirection);
        const ball = new Ball(cameraPosition, cameraDirection, 15.0);
        this.balls.push(ball);
        this.scene.add(ball);
        this.loop.addUpdateable(ball);
    }

    removeBall() {
        if (this.balls.length > 0) {
            const ball = this.balls.pop();
            this.scene.remove(ball as Mesh);
            this.loop.removeUpdateable(ball as Ball);
        }
    }

    setAmbientLight(value : boolean)
    {
        // Not a great solution to do this by index TODO: set up a better way to handle this
        if (value) {
            this.lights[1].intensity = 0.5;
        }
        else {
            this.lights[1].intensity = 0;
        }
    }

    setPointLight(value : boolean)
    {
        if (value) {
            this.lights[2].intensity = 60;
        }
        else {
            this.lights[2].intensity = 0;
        }
    }

    getFrameRate(): number {
        return this.loop.getFrameRate();
    }

    setWireframe(value: boolean) {
        this.balls.forEach(ball => ball.setWireframe(value));
    }
}

export { World };