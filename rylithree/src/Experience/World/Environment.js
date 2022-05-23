import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
   constructor() {
      
      this.experience = new Experience()
      this.scene = this.experience.scene

      this.setPointLight()
      this.setAmbientLight()
      this.setFog()
   }

   setPointLight() {
      this.pointLight = new THREE.PointLight(0x3e8edf, 1)
      this.pointLight.position.set(50, 50, 0)

      this.scene.add(this.pointLight)
   }

   setAmbientLight() {
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
      this.ambientLight.position.set(0, 5, 0)
      this.scene.add(this.ambientLight)
   }
   
   setFog() {
      this.scene.fog = new THREE.Fog('#0e0e0e', 1, 5)
   }
}