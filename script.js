import { AsciiEffect } from 'https://threejs.org/examples/jsm/effects/AsciiEffect.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// ASCII Effect
const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
effect.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(effect.domElement);
renderer.domElement.remove(); // Ensures only ASCIIEffect is displayed

// Double Helix Geometry
const helix = new THREE.Group();
const segmentCount = 50; // Number of spheres in each helix strand
const radius = 2; // Radius of the helix
const twistFactor = 0.2; // How much the helix twists
const helixSpacing = 0.5; // Spacing between strands

for (let i = 0; i < segmentCount; i++) {
    const angle = i * 0.3; // Spacing between each segment
    const y = (i - segmentCount / 2) * 0.5; // Adjust height

    // First strand
    const sphereGeometry1 = new THREE.SphereGeometry(0.3, 8, 8);
    const sphereMaterial1 = new THREE.MeshNormalMaterial();
    const sphere1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
    sphere1.position.set(
        Math.cos(angle) * radius, 
        y, 
        Math.sin(angle) * radius 
    );
    sphere1.rotation.y = angle * twistFactor;
    helix.add(sphere1);

    // Second strand (opposite phase)
    const sphereGeometry2 = new THREE.SphereGeometry(0.3, 8, 8);
    const sphereMaterial2 = new THREE.MeshNormalMaterial();
    const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    sphere2.position.set(
        Math.cos(angle + Math.PI) * radius, 
        y + helixSpacing, 
        Math.sin(angle + Math.PI) * radius 
    );
    sphere2.rotation.y = angle * twistFactor;
    helix.add(sphere2);
}

scene.add(helix);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);

let lightSpeed = 0.05;
let lightAngle = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Swing light from right to left
    lightAngle += lightSpeed;
    light.position.set(Math.sin(lightAngle) * 5, 2, 5); // Moves left & right
    
    // Rotate helix
    helix.rotation.y += 0.01;
    helix.rotation.x += 0.005;
    
    effect.render(scene, camera);
}

animate();

// Resize event
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
});
