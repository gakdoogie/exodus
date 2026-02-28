import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Just to prove it works:
console.log("Three.js is locked and loaded:", THREE);

// 1. Create the Scene (The Void)
const scene = new THREE.Scene();

// 2. Create the Camera (The Eyeballs) 
// Arguments: Field of View, Aspect Ratio, Near Clipping Plane, Far Clipping Plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Move the camera back slightly so we aren't inside the objects we create
camera.position.z = 30;

// 3. Create the Renderer (The Engine)
// We tell it to use your existing canvas! 
const canvas = document.querySelector('#orbitalCanvas'); // Make sure your HTML canvas has id="bg"
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setPixelRatio(window.devicePixelRatio); // Makes it look sharp on Retina/mobile screens
renderer.setSize(window.innerWidth, window.innerHeight); // Makes it fill the screen

// This listens to your mouse/touch on the canvas and moves the camera!
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 1. THE CHUNKY GEOMETRY
// We use an Icosahedron (a 20-sided shape). The '1' means low detail, keeping it blocky.
const planetGeo = new THREE.IcosahedronGeometry(2, 3);

// 2. THE BRUTALIST MATERIAL (FLAT SHADING)
// A crushing dark gray. 'flatShading: true' is the magic command that makes the polygons sharp.
const planetMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a, 
    flatShading: true,
    roughness: 0.8 // Makes it look matte, like manufactured metal
});
const planet = new THREE.Mesh(planetGeo, planetMat);
scene.add(planet);

// 3. THE NEON WIREFRAME OVERLAY
// We create a striking cyber-yellow wireframe using the exact same geometry.
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xcfff04, // A stark, toxic neon yellow
    wireframe: true,
    transparent: true,
    opacity: 0.2 // Keeps it from being too blinding
});

const wireframe = new THREE.Mesh(planetGeo, wireMat);
// We scale it up by 1% so it perfectly hovers just above the dark metal surface
wireframe.scale.set(1.01, 1.01, 1.01); 

// By adding the wireframe to the planet (instead of the scene), they are locked together!
planet.add(wireframe);

// THE CINEMATIC LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Very low base light
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 3); // Overblown, harsh white light
dirLight.position.set(5, 5, 2); // Angled from the top right
scene.add(dirLight);

// 5. The Game Loop (Animation)
// This tells the browser to take a photo 60 times a second
function animate() {
  requestAnimationFrame(animate);

  // Update the orbital controls every frame
  controls.update();

  renderer.render(scene, camera);
}

// Start the loop!
animate();