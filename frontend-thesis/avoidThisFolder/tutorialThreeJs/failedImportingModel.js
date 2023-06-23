import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {func} from "three/examples/jsm/nodes/code/FunctionNode";

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
camera.position.set(5, 8, 30);
orbit.update();

const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(directionalLight);
directionalLight.position.set(10, 11, 7);

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function(url, loaded, total){
    console.log(`started loading: ${url}`);
}
const gltfLoader = new GLTFLoader(loadingManager);
const rgbeLoader = new RGBELoader(loadingManager);

let mars;

gltfLoader.load('./src/mars/scene.gltf', function (gltf){
    console.log('GLTF model loaded');
    const model = gltf.scene;
    scene.add(model);
    mars = model;
});

/*rgbeLoader.load('./src/mars/MR_INT-006_LoftIndustrialWindow_Griffintown.hdr', function (texture){
    texture.mapping = THREE.EquirectangularRefractionMapping;
    scene.environment = texture;
    console.log('HDR texture loaded');


});*/


function animate(time) {
    if(mars)
        mars.rotation.y = - time / 3000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
