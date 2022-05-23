import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import vertexShader2 from '../shaders/vertex2.glsl'
import fragmentShader2 from '../shaders/fragment2.glsl'
import * as dat from 'dat.gui'
import { Material } from 'three'

// 'rgb(14, 14, 14)'
// 'rgb(0, 0, 0)'
const uColors = {
   uValleyColorBase: 0x0e0e0e,
   uPeakColorBase: 0x0000,
   
   uValleyColor: {r: 14/255, g: 14/255, b: 14/255},
   uPeakColor: {r: 0, g: 0, b: 0}
}

const canvas = document.querySelector('canvas.webgl')
const cursor = {x: 0, y: 0}
const sizes = {
   width: window.innerWidth,
   height: window.innerHeight
}
const yAxis = new THREE.Vector3(0, 1, 0).normalize()


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 1000)
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
// const clock = new THREE.Clock()

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

export default class Experience {

   constructor(geometry, material, mesh, dispose = false){

      this.geometry = geometry
      this.material = material
      this.mesh = mesh

      this.material.side = THREE.DoubleSide

      scene.add(this.mesh)

      camera.position.set(1, 0, 2)
      camera.lookAt(this.mesh.position)
      scene.add(camera)

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      

      // Event Listeners
      window.addEventListener('mousemove', () => {
         cursor.x = event.clientX / sizes.width - 0.5
         cursor.y = event.clientY / sizes.height - 0.5
      })
    
      window.addEventListener('resize', () => {
         // Update sizes
         sizes.width = window.innerWidth
         sizes.height = window.innerHeight

         // Update camera
         camera.aspect = sizes.width / sizes.height
         camera.updateProjectionMatrix()

         // Update renderer
         renderer.setSize(sizes.width, sizes.height)
         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
      
      this.update(dispose)

   }

   update(dispose) {
      // const elapsedTime = clock.getElapsedTime()
      this.mesh.rotateOnWorldAxis(yAxis, 0.008)
      // camera.rotation.y = - (cursor.x * 0.04)
      // camera.rotation.x = - (cursor.y * 0.04)

      // Update controls
      window.requestAnimationFrame(() => {
         
         // controls.update()
         renderer.render(scene, camera)
         if(dispose){

            scene.remove(this.mesh)
            this.geometry.dispose()
            this.material.dispose()
            
         }
         this.update()
      })
      // Render
      
      // Call tick again on the next frame
   }
}

// init()

// function init() {

//     const cursor = {x: 0, y: 0}
//     // Canvas
//     const canvas = document.querySelector('canvas.webgl')
    
//     // Scene
//     const scene = new THREE.Scene()

//     ////////
//     //////// Scene 2
//     ////////
//     const scene2 = new THREE.Scene()

//     const textureLoader = new THREE.TextureLoader()
//     const texture = textureLoader.load('/textures/background_sign3.jpg')
//     // const texture = textureLoader.load('/textures/flag-french.jpg')

//     const imageGeometryWidth = 4
//     const imageGeometry = new THREE.PlaneGeometry(imageGeometryWidth, 2.5)

//     const testMat = new THREE.MeshNormalMaterial()
//     const imageMaterial = new THREE.MeshBasicMaterial({map: texture})
    
//     const image = new THREE.Mesh(imageGeometry, imageMaterial)
//     // image.scale.y = texture.height
//     scene2.add(image)

//     ////////
//     ////////
//     ////////
    
//     /**
//     * Test mesh
//     */
//     // Geometry
//     const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    
//     const count = geometry.attributes.position.count
//     const randoms = new Float32Array(count)
    
//     for (let i = 0; i < count; i++) {
//         randoms[i] = Math.random()
//     }
    
//     geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    
//     const fog = new THREE.Fog('#0e0e0e', 1, 5)
//     scene.fog = fog
//     scene.background = new THREE.Color('#0e0e0e')
    
    
//     // Peak & Valley colors
    
//     // Material
//     // const standardMaterial = new THREE.MeshStandardMaterial()
//     const shaderMaterial = new THREE.ShaderMaterial({
//         vertexShader: vertexShader,
//         fragmentShader: fragmentShader,
//         transparent: true,
//         fog: true,
//         lights: true,
//         uniforms: {
//             uTime: { value: 0 },
//             uElevation: { value: 0.2 },
//             uFrequency: { value: new THREE.Vector2(4, 1.5) },
//             uSpeed: { value: 0.25},
//             uValleyColor: { value: new THREE.Color(0x0e0e0e)},
//             uPeakColor: { value: new THREE.Color(uColors.uPeakColorBase)},
//             // uValleyColor: { value: new THREE.Color(uColors.uValleyColor.r, uColors.uValleyColor.g, uColors.uValleyColor.b)},
//             // uPeakColor: { value: new THREE.Color(uColors.uPeakColor.r, uColors.uPeakColor.g, uColors.uPeakColor.b)},
//             uColorOffset: { value: 0.08 },
//             uColorMultiplier: { value: 5 },
//             ...THREE.UniformsLib['fog'],
//             ...THREE.UniformsLib['lights'],
//         }
//     })
    
//     const gui = new dat.GUI()
//     gui
//         .addColor(uColors, 'uValleyColorBase')
//         .onChange(() => {
//             shaderMaterial.uniforms.uValleyColor.value.set(uColors.uValleyColorBase)
//         })
//     console.log(shaderMaterial.uniforms.uValleyColor.value)
//     gui
//         .addColor(uColors, 'uPeakColorBase')
//         .onChange(() => {
//             shaderMaterial.uniforms.uPeakColor.value.set(uColors.uPeakColorBase)
//         })
//     console.log(shaderMaterial.uniforms.uPeakColor.value)
    
    
//     const colors = {
//         valley: 0x1a1a1a,
//         peak: 0x000000,
//     }
    
    
    
//     const shaderMaterial2 = new THREE.ShaderMaterial({
//         vertexShader: vertexShader2,
//         fragmentShader: fragmentShader2,
//         transparent: true,
//         fog: true,
//         lights: true,
//         uniforms: {
//             uTime: { value: 0 },
//             uElevation: { value: .05 },
//             uFrequency: { value: new THREE.Vector2(4, 1.2) },
//             uSpeed: { value: .7},
//             // uValleyColor: { value: new THREE.Color('#1a1a1a')},
//             uValleyColor: { value: new THREE.Color(colors.valley)},
//             uPeakColor: { value: new THREE.Color(colors.peak)},
//             uColorOffset: { value: 0.08 },
//             uColorMultiplier: { value: 10 },
//             ...THREE.UniformsLib['fog'],
//             ...THREE.UniformsLib['lights'],
//         }
//     })
    
//     // Mesh
//     const sphere = new THREE.Mesh(new THREE.SphereGeometry(.3, 128, 128), shaderMaterial2)
//     const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 512, 512), shaderMaterial)
//     plane.rotation.x = - Math.PI * 0.5
//     plane.position.y = -0.5
//     scene.add(plane, sphere)
    
    
//     // Lights
//     const pointLight = new THREE.PointLight(0x3e8edf, 1)
//     pointLight.position.set(50, 50, 0)
//     pointLight.lookAt(sphere.position)
//     const ambientLight = new THREE.AmbientLight(0xffffff, .25)
//     ambientLight.position.set(0, 5, 0)
    
//     scene.add(pointLight, ambientLight)
//     /**
//     * Sizes
//     */
//     const sizes = {
//         width: window.innerWidth,
//         height: window.innerHeight
//     }
    
//     window.addEventListener('mousemove', () => {
//         cursor.x = event.clientX / sizes.width - 0.5
//         cursor.y = event.clientY / sizes.height - 0.5
//     })
    
//     window.addEventListener('resize', () => {
//         // Update sizes
//         sizes.width = window.innerWidth
//         sizes.height = window.innerHeight

//         // if (window.innerwidth > imageGeometryWidth) {
//         //     imageGeometryWidth = window.innerWidth
//         // }
    
//         // Update camera
//         camera.aspect = sizes.width / sizes.height
//         // camera.aspect = sizes.width
//         camera.updateProjectionMatrix()
    
//         // Update renderer
//         renderer.setSize(sizes.width, sizes.height)
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//     })
    
//     /**
//     * Camera
//     */
//     // Base camera
//     const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 1000)
//     camera.position.set(0, 0, 1)
//     // camera.rotation.x = -.25
//     camera.lookAt(sphere.position)
//     scene.add(camera)
//     scene2.add(camera)
    
//     // Controls
//    //  const controls = new OrbitControls(camera, canvas)
//    //  controls.enableDamping = true
    
//     // Group
//     const anchor = new THREE.Group()
//     anchor.add(camera)
    
//     /**
//     * Renderer
//     */
//     const renderer = new THREE.WebGLRenderer({
//         canvas: canvas
//     })
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
//     /**
//     * Animate
//     */
//     const clock = new THREE.Clock()
//     const yAxis = new THREE.Vector3(0, 1, 0).normalize()
    
//     const tick = () =>
//     {  
//         const elapsedTime = clock.getElapsedTime()
//         // anchor.rotateOnWorldAxis(yAxis, 0.0008)
//         camera.lookAt(sphere.position)
//         camera.rotation.y = - (cursor.x * 0.04)
//         camera.rotation.x = - (cursor.y * 0.04)
    
//         // camera.position.x = Math.sin(elapsedTime * 0.1)
//         // camera.position.z = Math.cos(elapsedTime * 0.1)
//         // anchor.rotate

//         // camera.rotation.x = -Math.sin(elapsedTime * 0.1)
//         // camera.rotation.y = Math.cos(elapsedTime * 0.1)

//         // Tween Valley and Peak Colors 
//         // shaderMaterial.uniforms.uPeakColor.value = uColors.uPeakColor
//         // shaderMaterial.uniforms.uValleyColor.value = uColors.uValleyColor
//         // shaderMaterial.uniforms.uPeakColor.value.setHSL(uColors.uPeakColor.h, uColors.uPeakColor.s, uColors.uPeakColor.l)
//         // shaderMaterial.uniforms.uValleyColor.value.setHSL(uColors.uValleyColor.h, uColors.uValleyColor.s, uColors.uValleyColor.l)

    
//         shaderMaterial.uniforms.uTime.value = elapsedTime
//         shaderMaterial2.uniforms.uTime.value = elapsedTime
    
//         // Update controls
//       //   controls.update()
    
//         // Render
//         renderer.render(scene2, camera)
    
//         // Call tick again on the next frame
//         window.requestAnimationFrame(tick)
//     }
    
//     tick()
// }


