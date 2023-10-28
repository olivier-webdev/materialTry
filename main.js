import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

// initialize the material
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
//   transparent: true,
//   opacity: 0.4,
// });
const material = new THREE.MeshLambertMaterial();
// material.color = new THREE.Color("white");

material.side = THREE.DoubleSide;

const fog = new THREE.Fog(0xffffff, 1, 10);

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5;
const mesh3 = new THREE.Mesh(planeGeometry, material);
mesh3.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);
scene.fog = fog;
scene.background = new THREE.Color(0xffffff);

// initialize the light
const light = new THREE.AmbientLight("green", 0.5);
scene.add(light);

const pointLight = new THREE.PointLight("green", 1);
pointLight.position.set(5, 5, 2);
scene.add(pointLight);

// intialize the camera
const camera = new THREE.PerspectiveCamera(
  35, // POV point of view
  window.innerWidth / window.innerHeight, // ratio
  0.1, // near distance
  200 // far distance
);
camera.position.z = 5;

// initialize the render
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// instanciate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
