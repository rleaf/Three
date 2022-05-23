import * as THREE from 'three'
import Experience from '../Experience'
import vertex from '../shaders/vertex2.glsl'
import fragment from '../shaders/fragment2.glsl'

export default class Sphere {
   constructor() {

      this.experience = new Experience()
      this.scene = this.experience.scene

      this.setGeometry()
      this.setMaterial()
      this.setMesh()
   }

   setGeometry() {
      this.geometry = new THREE.SphereGeometry(.3, 128, 128)
   }
   
   setMaterial() {
      this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      fog: true,
      lights: true,
      uniforms: {
         uTime: { value: 0 },
         uElevation: { value: .05 },
         uFrequency: { value: new THREE.Vector2(4, 1.2) },
         uSpeed: { value: .7},
         uValleyColor: { value: new THREE.Color(0x1a1a1a)},
         uPeakColor: { value: new THREE.Color(0x000000)},
         uColorOffset: { value: 0.08 },
         uColorMultiplier: { value: 10 },
         uTransparency: { value: 1.0 },
         ...THREE.UniformsLib['fog'],
         ...THREE.UniformsLib['lights'],
      }
      })
   }

   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.mesh)
   }
}