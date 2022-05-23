import './style.css'
import Experience from './Experience/Experience.js'
import * as THREE from 'three'

const geometry = new THREE.PlaneGeometry(1, 1)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)


const experience = new Experience(
    geometry,
    material,
    mesh,
    false
    )

