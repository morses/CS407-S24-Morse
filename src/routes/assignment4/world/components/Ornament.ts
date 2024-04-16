import { OctahedronGeometry, SphereGeometry, Mesh, MeshStandardMaterial } from 'three';
import type { Animateable } from '../Animateable.js';

class Sphere extends Mesh {
    constructor(radius: number = 1.0) {
        const geometry = new SphereGeometry(radius, 32, 32);
        const material = new MeshStandardMaterial({
            color: 'silver',
            roughness: 0.7,
            metalness: 0.1
        });
        super(geometry, material);
    }
}

export class Ornament extends Mesh implements Animateable {

    private sphere: Sphere;
    private mainGeometry: OctahedronGeometry;
    private mainMaterial: MeshStandardMaterial;
    private rotationRate: number = 2*Math.PI / 40;      // radians per second, one revolution every 40 seconds

    constructor() {
        const geometry = new OctahedronGeometry(7, 0);
        const material = new MeshStandardMaterial({
            color: '#ffd700',
            roughness: 0.7,
            metalness: 0.1
        });
        super(geometry, material);
        this.mainGeometry = geometry;
        this.mainMaterial = material;
        this.sphere = new Sphere();
        this.sphere.position.set(3, 3, 3);
        this.add(this.sphere);
        this.rotateX(-Math.PI / 2);
    }

    tick(delta: number) {
        // delta is in seconds, rotation rate is in radians/sec, so we just need radians
        //this.rotation.x += this.rotationRate * delta;
        //this.rotation.y += this.rotationRate * delta;
        this.rotation.z += this.rotationRate * delta;
    }

    setColor(hexValue: string) {
        this.mainMaterial.color.set(hexValue);
    }

    getColor(): string {
       return this.mainMaterial.color.getHexString();
    }

    setWireframe(value: boolean) {
        this.mainMaterial.wireframe = value;
    }
}

