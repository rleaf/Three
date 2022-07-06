import * as THREE from 'three'
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'
import Experience from '../Experience'

export default class Plane {
   constructor() {

      this.experience = new Experience()
      this.scene = this.experience.scene

      this.setGeometry()
      this.setMaterial()
      this.setMesh()
   }

   setGeometry() {
      this.geometry = new THREE.PlaneGeometry(10, 10, 512, 512)
   }

   setMaterial() {

      // this.material = new THREE.MeshBasicMaterial()

      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         transparent: true,
         fog: true,
         lights: true,
         uniforms: {
            uTime: { value: 0 },
            uElevation: { value: 0.2 },
            uFrequency: { value: new THREE.Vector2(4, 1.5) },
            uSpeed: { value: 0.25},
            uValleyColor: { value: new THREE.Color(0x0e0e0e)},
            uPeakColor: { value: new THREE.Color(0x000000)},
            // uValleyColor: { value: new THREE.Color(uColors.uValleyColor.r, uColors.uValleyColor.g, uColors.uValleyColor.b)},
            // uPeakColor: { value: new THREE.Color(uColors.uPeakColor.r, uColors.uPeakColor.g, uColors.uPeakColor.b)},
            uColorOffset: { value: 0.11 },
            uColorMultiplier: { value: 5 },
            uTransparency: { value: 1.0 },
            ...THREE.UniformsLib['fog'],
            ...THREE.UniformsLib['lights'],

         }

      })
   }

   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.rotation.x = -Math.PI * 0.5
      this.mesh.position.y = -0.5
      this.scene.add(this.mesh)
   }
}