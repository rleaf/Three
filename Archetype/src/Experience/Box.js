import * as THREE from 'three'
import { MeshBasicMaterial } from 'three'
import Experience from './Experience'

export default class Box {
   constructor() {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.resources = this.experience.resources
      
      this.setGeometry()
      this.setMaterial()
      this.setMesh()
   }

   setGeometry() {
      this.geometry = new THREE.BoxGeometry(1, 1, 1)
   }

   setMaterial() {
      // this.material = new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
      this.material = new THREE.MeshBasicMaterial({color: 0xf33fff})
   }

   setMesh() {
      const cube = new THREE.Mesh(this.geometry, this.material)
      
      this.scene.add(cube) 
   }

}