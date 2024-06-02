import { Ball } from "../components/Ball";
import type { Animateable } from "../Animateable";

export class Collider implements Animateable {
    private balls : Ball[];

    constructor(balls : Ball[]) {
        this.balls = balls;
    }

    handleCollisions() {
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                const ball1 = this.balls[i];
                const ball2 = this.balls[j];
                if (ball1.collidesWith(ball2)) {
                    ball1.bounceOff(ball2);
                }
            }
        }
    }

    tick(delta : number) {
        this.handleCollisions();
    }
}