import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";

const hdrTextureURL = new URL('../mars/MR_INT-006_LoftIndustrialWindow_Griffintown.hdr', import.meta.url);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

const progressBar = document.getElementById('progress-bar');


const loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function (url, loaded, total){
    progressBar.value = (loaded / total) * 100;
}

// comment before knowing how to introduce CSS style

/*const progressBarContainer = document.querySelector('.progress-bar-container');

loadingManager.onLoad = function (){
    progressBarContainer.style.display = 'none';
}*/
const gltfLoader = new GLTFLoader(loadingManager);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;

// Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const rgbeLoader = new RGBELoader(loadingManager);
rgbeLoader.load (hdrTextureURL, function (texture) {
    console.log("alright")
    texture.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = texture;
    scene.environment = texture;

    /*   const sphere = new THREE.Mesh(
           new THREE.SphereGeometry(1, 50, 50),
           new THREE.MeshPhysicalMaterial({
               roughness: 0,
               metalness: 0,
               transmission: 1,
               ior: 2.33
           })
       );
       scene.add(sphere);
       sphere.position.x = 1.5;*/
})


function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});