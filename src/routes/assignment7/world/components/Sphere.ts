import { BufferGeometry, SphereGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';

export class Sphere extends Mesh {
    private mainGeometry: BufferGeometry;
    private mainMaterial: ShaderMaterial;

    constructor(radius: number = 1.0) {
        const geometry = new SphereGeometry(radius, 32, 32);
        const material = new ShaderMaterial({
            uniforms: {
                objColor: { value: new Vector3(1.0, 0.0, 0.0) },
                xValue: { value: 0.0 },
                yValue: { value: 0.0 },
                zValue: { value: 0.0 }
            }
        });
        super(geometry, material);
        this.mainGeometry = geometry;
        this.mainMaterial = material;
    }

    setVertexShader(vertexShader: string) {
        this.mainMaterial.vertexShader = vertexShader;
        this.mainMaterial.needsUpdate = true;
    }

    setFragmentShader(fragmentShader: string) { 
        this.mainMaterial.fragmentShader = fragmentShader;
        this.mainMaterial.needsUpdate = true;
    }

    updateUniform(name: string, value: any) {
        this.mainMaterial.uniforms[name].value = value;
        this.mainMaterial.uniformsNeedUpdate = true;
    }

    setColor(hexValue: string) {
        //this.mainMaterial.color.set(hexValue);
    }

    getColor(): string {
        //return this.mainMaterial.color.getHexString();
        return '';
    }
    
    
    setWireframe(value: boolean) {
        this.mainMaterial.wireframe = value;
    }
}
