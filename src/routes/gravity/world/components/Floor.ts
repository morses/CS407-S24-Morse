import { Mesh, PlaneGeometry, MeshPhongMaterial, MeshStandardMaterial, DoubleSide, GridHelper } from 'three';

export class Floor extends Mesh {
    constructor(zheight : number = 0) {
        const geometry = new PlaneGeometry(100, 100, 1, 1);
        const material = new MeshPhongMaterial({color: 0x345566, side: DoubleSide});
        super(geometry, material);

        const gridGeometry = new GridHelper(100, 20, 0x444444, 0x444444);
        gridGeometry.rotateX(Math.PI / 2);
        gridGeometry.position.set(0, 0, 0);
        this.add(gridGeometry);

        this.rotateX(-Math.PI / 2);
        this.position.set(0, zheight, 0);
        //this.receiveShadow = true;
    }
}