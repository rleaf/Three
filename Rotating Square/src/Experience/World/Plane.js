import * as THREE from 'three'
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
      this.geometry = new THREE.PlaneGeometry(1, 1)
   }

   setMaterial() {
      this.material = new THREE.MeshNormalMaterial()
      this.material.side = THREE.DoubleSide
   }

   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.transpa
      this.mesh.position.set(2, 0, 0)
      this.scene.add(this.mesh)
   }
}