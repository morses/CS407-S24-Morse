import { BufferGeometry,  SphereGeometry, Mesh, MeshStandardMaterial,MeshPhysicalMaterial, Vector3 } from 'three';
import type { Animateable } from '../Animateable.js';
import { Kinematics } from './Kinematics.js';

export class Ball extends Mesh implements Animateable {

    private mainGeometry: BufferGeometry;
    private mainMaterial: MeshStandardMaterial;

    // Helper object to manage this object's motion (use "has-a" relationship instead of "is-a" because JS/TS doesn't support multiple inheritance)
    private kinematics: Kinematics;

    constructor(position: Vector3, direction: Vector3, speed: number) {
        const geometry = new SphereGeometry(1, 32, 32);
        const material = new MeshPhysicalMaterial({
            color: '#2f4eca',
            roughness: 0.478,
            metalness: 0.835,
            reflectivity: 0.529,
            iridescence: 0.898,
            iridescenceIOR: 2.18,
            sheen: 0.796,
            sheenRoughness: 0.555,
            sheenColor: '#1a8e1c',
        });
        super(geometry, material);
        this.mainGeometry = geometry;
        this.mainMaterial = material;
        this.kinematics = new Kinematics(1.0);
        this.kinematics.position.copy(position);
        // combine direction and speed into a single vector
        direction.normalize();
        this.kinematics.velocity.copy(direction.multiplyScalar(speed));
    }

    tick(delta : number) {
        this.kinematics.tick(this, delta);
    }

    collidesWith(other: Ball) : boolean {
        const distance = this.position.distanceTo(other.position);
        return distance < 2.0;   // really should parameterize the bounds radius
    }

    bounceOff(other: Ball) {
        // First calculate the normal vector between the two balls
        const normal = other.kinematics.position.clone().sub(this.kinematics.position).normalize();
        // Now calculate the relative velocity of the two balls
        const relativeVelocity = this.kinematics.velocity.clone().sub(other.kinematics.velocity);
        // and dot it with the normal to get the component of the relative velocity in the normal direction
        const velocityAlongNormal = relativeVelocity.dot(normal);
        // Update the velocities of the two balls
        this.kinematics.velocity.add(normal.clone().multiplyScalar(-velocityAlongNormal));
        other.kinematics.velocity.add(normal.clone().multiplyScalar(velocityAlongNormal));
        // let the next tick update the positions of the balls
    }

    setWireframe(value: boolean) {
        this.mainMaterial.wireframe = value;
    }
}