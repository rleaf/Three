// Add features to every fragment. Enables broadcasting of a scalar value to every fragment of a shader
// which makes mutations more ammenable in the JS.
uniform vec2 uFrequency;
uniform float uTime;

// Add idiosyncrasies between the fragments of a shader
attribute float aRandom;

// Pass values from vertex shader to fragment shader
varying float vRandom;
varying float vFrequency;
varying vec2 vUv;

void main()
{
   vec4 modelPosition = modelMatrix * vec4(position , 1.0);
   // modelPosition.z += sin(modelPosition.x * 10.0) * 0.3;
   // modelPosition.z += aRandom * 0.1;
   modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.3;
   modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.3;

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectedPosition = projectionMatrix * viewPosition;
   vRandom = aRandom;
   vUv = uv;

   gl_Position = projectedPosition;
   

}