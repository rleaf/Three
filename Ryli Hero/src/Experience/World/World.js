import * as THREE from 'three'
import Experience from "../Experience"
import Environment from './Environment'
import Sphere from './Sphere'
import Plane from './Plane'

export default class World {
   constructor() {
      
      this.experience = new Experience()
      this.time = this.experience.time
      this.scene = this.experience.scene
      this.environment = new Environment()
      this.sphere = new Sphere()
      this.plane = new Plane()
      this.scene.background = new THREE.Color('#0e0e0e')
   }

   update() {
      const coef = 0.0008

      this.sphere.material.uniforms.uTime.value = this.time.elapsed * coef
      this.plane.material.uniforms.uTime.value = this.time.elapsed * coef
   }
}