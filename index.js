import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x7a7a7a);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const ambient = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 0.15 );
scene.add( ambient );
const spotLight = new THREE.SpotLight( 0xff0000, 1 );

spotLight.position.set( 1.4, 5, 5.8 );
spotLight.angle = Math.PI / 8;
spotLight.penumbra = 1;
spotLight.decay = 2;
spotLight.distance = 1000;
spotLight.map = null;
spotLight.color.setHex( 0xff0000 );
spotLight.intensity = 2; // or any other value that works for your scene

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 10;
spotLight.shadow.focus = 1;

scene.add( spotLight );

const lightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( lightHelper );


const geometry = new THREE.BoxGeometry( 1.5, 5 , 1.8 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

// const cube1 = new THREE.Mesh( geometry, material );
// scene.add( cube1 );
// cube1.position.set(1.4, 2.5, 5.8);

const cube2 = new THREE.Mesh( geometry, material );
scene.add( cube2 );
cube2.position.set(1.4, 2.5, 8.5);

const cube3 = new THREE.Mesh( geometry, material );
scene.add( cube3 );
cube3.position.set(-1.5, 2.5, 7.1);


const loader = new GLTFLoader();
let model;

loader.load('./ReefBreeders.gltf', (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

camera.position.z = 35;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    // model.rotation.x += 0.01;
    // model.rotation.y += 0.01;
  }


  controls.update(); // обновляем управление орбитой


  renderer.render(scene, camera);
};

animate();