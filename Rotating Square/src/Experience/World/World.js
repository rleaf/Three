import * as THREE from 'three'
import Experience from "../Experience"
import Environment from './Environment'
import Box from './Box'
import Plane from './Plane'

export default class World {
   constructor() {
      
      this.experience = new Experience()
      this.camera = this.experience.camera
      this.time = this.experience.time
      this.scene = this.experience.scene
      this.environment = new Environment()
      this.plane = new Plane()

      
      this.setCamera()
   }

   update() {
      // this.box.mesh.rotation.y += 0.005
      // console.log(this.experience.time);
   }
   
   setCamera() {
      // this.camera.instance.lookAt(this.plane.mesh.position)
      this.camera.controls.target = this.plane.mesh.position
      // console.log(this.plane.mesh.position);
   }
}