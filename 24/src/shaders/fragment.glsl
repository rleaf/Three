varying float vRandom;
varying vec2 vUv;

void main() {
   // gl_FragColor = vec4(1.0, vRandom, 1.0, 1.0);
   gl_FragColor = vec4(vUv, 1.0, 1.0);
}