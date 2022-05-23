import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas0 = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

for (let i = 0; i < count; i++) {
    randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

const fog = new THREE.Fog('#0e0e0e', 1, 5)
scene.fog = fog
scene.background = new THREE.Color('#0e0e0e')

// Material
const basicMaterial = new THREE.MeshBasicMaterial({color: 0xf33fff})
const standardMaterial = new THREE.MeshStandardMaterial()
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    fog: true,
    lights: true,
    uniforms: {
        uTime: { value: 0 },
        uElevation: { value: 0.2 },
        uFrequency: { value: new THREE.Vector2(4, 1.5) },
        uSpeed: { value: 0.25},
        uValleyColor: { value: new THREE.Color('#0e0e0e')},
        uPeakColor: { value: new THREE.Color('#000000')},
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },
        ...THREE.UniformsLib['fog'],
        ...THREE.UniformsLib['lights'],
    }
})

// const material = new THREE.MeshBasicMaterial()
// Mesh
const sphere = new THREE.Mesh(new THREE.SphereGeometry(.3, 32, 16), standardMaterial)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 512, 512), shaderMaterial)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = -0.5
const mesh = new THREE.Mesh(geometry, shaderMaterial)
scene.add(plane, sphere)


// Lights
const pointLight = new THREE.PointLight(0x3e8edf, 1)
pointLight.position.set(50, 50, 0)
pointLight.lookAt(sphere.position)
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
ambientLight.position.set(0, 5, 0)

scene.add(pointLight, ambientLight)
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: window.innerHeight
}



window.addEventListener('resize', () =>
{
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

/**
 * Camera
 */
// Base camera
 const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 1000)
camera.position.set(0.25, 0.2, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas0
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    shaderMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()