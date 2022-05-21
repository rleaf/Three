import * as THREE from 'three'
import Experience from "../Experience"
import Environment from './Environment'
import Box from './Box'

export default class World {
   constructor() {
      
      this.experience = new Experience()
      this.time = this.experience.time
      this.scene = this.experience.scene
      this.environment = new Environment()
      this.box = new Box()

      this.scene.background = new THREE.Color(0x252023)

      // const testMesh = new THREE.Mesh(
      //    new THREE.BoxGeometry(1, 1, 1), 
      //    // new THREE.MeshBasicMaterial({ wireframe: true })
      //    new THREE.MeshStandardMaterial()
      // )

      // this.scene.add(testMesh)
   }

   update() {
      this.box.mesh.rotation.y += 0.005
      // console.log(this.experience.time);
   }
}