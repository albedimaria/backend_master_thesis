import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import dat from "dat.gui";

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

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const gui = new dat.GUI();
let spheres = [];
let nextSphereId = 0;

const controls = {
    addSphere: function () {
        const sphere = createSphere(0xFFFFFF * Math.random());
        spheres.push(sphere);
        scene.add(sphere.mesh);
    }
}

gui.add(controls, "addSphere").name("Add Sphere")
function createSphere(color){

    const randColor = 0xffffff * Math.random();

    const sphere = {
        id: nextSphereId++,
        mesh: new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                color: color})
        ),
        /*rotationX: 0.01,
        rotationY : 0.01,*/
        color: color,
    };

    sphere.mesh.position.x = (Math.random() - 0.5) * 10;
    sphere.mesh.position.y = (Math.random() - 0.5) * 10;
    sphere.mesh.position.z = (Math.random() - 0.5) * 10;

    const sphereFolder = gui.addFolder(`Sphere ${sphere.id}`);
    sphereFolder.open();

    // .add(sphere, "rotationX", 0, 0.1).name("X rotation");
    // .add(sphere, "rotationY", 0, 0.1).name("Y rotation");

    /*const scaleFolder = sphereFolder.addFolder('Scale')
    scaleFolder.add(sphere.mesh.scale, 'x', 0, 2).name("Scale X axis");
    scaleFolder.add(sphere.mesh.scale, 'y', 0, 2).name("Scale Y axis");
    scaleFolder.add(sphere.mesh.scale, 'z', 0, 2).name("Scale Z axis");
    // scaleFolder.open();*/

    const meshFolder = sphereFolder.addFolder('Mesh Material')
    // Add a boolean variable for visibility control
    let sphereVisible = true;
    const visibilityController = meshFolder.add({ visible: sphereVisible }, 'visible').name("Visibility");
    // how visibility works
    visibilityController.onChange(function (value) {
        sphereVisible = value;
        sphere.mesh.visible = sphereVisible; // Set sphere visibility based on the boolean value
    });

    meshFolder.add(sphere.mesh.material, 'wireframe');

    // Store the previous color
    let previousColor = sphere.mesh.material.color.clone();

    meshFolder.addColor(sphere, "color").onChange(function (color){
        sphere.mesh.material.color = new THREE.Color(color);
    });

    const otherFolder = sphereFolder.addFolder('Other');

    let isPlaying = false;
    const playController = otherFolder.add({ playing: isPlaying }, 'playing').name("Play");

    playController.onChange(function (value) {
        isPlaying = value;

        if (isPlaying) {
            sphere.mesh.material.color.setHex(0xff0000); // Set sphere color to red
        } else {
            sphere.mesh.material.color.copy(previousColor); // restore previous color
        }
    });

    return sphere;
}

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
});
const sphere = new THREE.Mesh(geometry, material);

function animate() {
    requestAnimationFrame(animate);

    /*spheres.forEach((sphere) => {
        sphere.mesh.rotation.x += sphere.rotationX;
        sphere.mesh.rotation.y += sphere.rotationY;
    })*/

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});