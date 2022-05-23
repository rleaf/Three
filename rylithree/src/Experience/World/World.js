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
      this.sizes = this.experience.sizes
      this.camera = this.experience.camera
      this.environment = new Environment()
      this.sphere = new Sphere()
      this.plane = new Plane()
      this.cursor = {
         x: 0,
         y: 0
      }

      this.environment.pointLight.lookAt(this.sphere.mesh.position)
      this.scene.background = new THREE.Color('#0e0e0e')

      window.addEventListener('mousemove', () => {
         this.cursor.x = event.clientX / this.sizes.width - 0.5
         this.cursor.y = event.clientY / this.sizes.height - 0.5
      })
   }

   update() {
      // const cursor = { x: 0, y: 0}
      const coef = 0.0008
      const yAxis = new THREE.Vector3(0, 1, 0).normalize()

      this.camera.anchor.rotateOnWorldAxis(yAxis, 0.0008)
      this.camera.instance.rotation.x = -(this.cursor.y * 0.04)
      this.camera.instance.rotation.y = -(this.cursor.x * 0.04)

      this.sphere.material.uniforms.uTime.value = this.time.elapsed * coef
      this.plane.material.uniforms.uTime.value = this.time.elapsed * coef
   }
}