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
      this.plane.mesh.rotation.y += 0.005
   }
   
   setCamera() {
      // The plane isn't centered to origin (for fun), so have the camera set to look
      // at the plane
      this.camera.controls.target = this.plane.mesh.position
   }
}