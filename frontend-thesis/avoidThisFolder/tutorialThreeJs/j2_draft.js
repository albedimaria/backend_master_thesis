import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {SimplexNoise} from "three/examples/jsm/math/SimplexNoise";


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

let count = 50;
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.InstancedMesh(geometry, material, count);
scene.add(mesh);

const temp_pos = new THREE.Object3D();

for(let i = 0; i < count; i++){
    /*temp_pos.position.x = Math.random() * 30 - 20;
    temp_pos.position.y = Math.random() * 30 - 20;
    temp_pos.position.z = Math.random() * 30 - 20;*/

    temp_pos.rotation.x = Math.random();
    temp_pos.rotation.y = Math.random();
    temp_pos.rotation.z = Math.random();

    temp_pos.scale.x = temp_pos.scale.y = temp_pos.scale.z = Math.random();

    temp_pos.updateMatrix();
    mesh.setMatrixAt(i, temp_pos.matrix);
    mesh.setColorAt(i, new THREE.Color(Math.random() * 0xFFFFFF));
}

const matrix = new THREE.Matrix4();
function animate(time) {
    for(let i = 0; i < count; i++){
        mesh.getMatrixAt(i, matrix);
        matrix.decompose(temp_pos.position, temp_pos.rotation, temp_pos.scale);

        /*temp_pos.rotation.x = i / 10000 * time / 1000;
        temp_pos.rotation.y = i / 10000 * time / 1000;
        temp_pos.rotation.z = i / 10000 * time / 1000;*/

        temp_pos.updateMatrix();
        mesh.setMatrixAt(i, temp_pos.matrix);
        mesh.setColorAt(i, new THREE.Color(Math.random() * 0xFFFFFF));
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.rotation.y = time / 10000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});