import { PerspectiveCamera } from 'three';

function createCamera() : PerspectiveCamera {
    const camera = new PerspectiveCamera(
        75, // fov = Field of View
        2,  // aspect ratio
        0.1,// near clipping plane
        200 // far clipping plane
    );
    camera.position.set(4, 10, 20);
    camera.lookAt(0, 0, 0);
    return camera;
}

export { createCamera };