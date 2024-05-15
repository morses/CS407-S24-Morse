## Default Attributes
```glsl
// default vertex attributes provided by BufferGeometry
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
```

### Using Uniforms in GLSL
Set color of all fragments to red, or the value of a uniform variable.
```glsl
// Fragment shader
uniform vec3 objColor;

void main() {
    //gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
    gl_FragColor = vec4(objColor,1.0);
}
```

Offset the position of all vertices by a uniform variable.
```glsl
// Vertex shader
uniform float xValue;
uniform float yValue;
uniform float zValue; 

void main() {
    vec3 location = vec3(xValue,yValue,zValue);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position + location, 1.0 );
}
```

Modify geometry
```glsl
// Vertex shader
uniform float zValue;

void main() {
    float zm = abs(10.0 - abs(zValue));
    float z = clamp(position.z,-zm,zm);
    vec3 newPosition = vec3(position.xy,z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
```

### Using Attributes in GLSL
Color the fragments based on the value of the normal vector
```glsl

// vertex shader
uniform float zValue;
out vec3 nNormal;

void main() {
    nNormal = normalize(normal);
    float zm = abs(10.0 - abs(zValue));
    float z = clamp(position.z,-zm,zm);
    vec3 newPosition = vec3(position.xy,z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

// fragment shader
in vec3 nNormal;
void main() {
    gl_FragColor = vec4( nNormal, 1.0 );
}
```

Or the position
```glsl
// vertex shader
uniform float zValue;
out vec3 nPosition;

void main() {
    float zm = abs(10.0 - abs(zValue));
    float z = clamp(position.z,-zm,zm);
    vec3 newPosition = vec3(position.xy,z);
    nPosition = abs(newPosition/4.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

// fragment shader

in vec3 nPosition;

void main() {
    gl_FragColor = vec4( nPosition, 1.0 );
}
```