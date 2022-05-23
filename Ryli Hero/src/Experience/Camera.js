import * as THREE from 'three'
import Experience from "./Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Camera {
   constructor() {

      this.experience = new Experience()
      this.sizes = this.experience.sizes
      this.scene = this.experience.scene
      this.canvas = this.experience.canvas
      this.cursor = {
         x: 0,
         y: 0
      }

      this.setInstance()
      this.setControls()
      this.setAnchor()
      this.setWobble()

   }

   setInstance() {
      this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
      this.instance.position.set(0, 0, 1)
      this.scene.add(this.instance)
   }

   setControls() {
      this.controls = new OrbitControls(this.instance, this.canvas)
      this.controls.enableDamping = true
      this.controls.enabled = false
   }

   setAnchor() {
      this.anchor = new THREE.Group()
      this.anchor.add(this.instance)
   }

   resize() {
      this.instance.aspect = this.sizes.width / this.sizes.height
      this.instance.updateProjectionMatrix()
   }

   setWobble() {
      window.addEventListener('mousemove', () => {
         this.cursor.x = event.clientX / this.sizes.width - 0.5
         this.cursor.y = event.clientY / this.sizes.height - 0.5
      })
   }

   update() {

      const yAxis = new THREE.Vector3(0, 1, 0).normalize()

      this.anchor.rotateOnWorldAxis(yAxis, 0.0008)
      this.instance.rotation.y = -(this.cursor.x * 0.04)
      this.instance.rotation.x = -(this.cursor.y * 0.04)
      this.controls.update()

   }
}