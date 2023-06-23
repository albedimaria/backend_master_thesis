import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0x000000);

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

const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        visible: false
    })
);
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);
planeMesh.name = 'ground';

const highlightMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true
    })
);
highlightMesh.rotateX(-Math.PI / 2);
highlightMesh.position.set(0.5, 0, 0.5);
scene.add(highlightMesh);


const mousePosition = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();
let intersects;

window.addEventListener('mousemove', function (e){
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
    rayCaster.setFromCamera(mousePosition, camera);
    intersects = rayCaster.intersectObjects(scene.children);
    intersects.forEach(function (intersect){
        if(intersect.object.name === 'ground'){
            const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
            highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);

            const objExist = objects.find(function(object){
                return (object.position.x === highlightMesh.position.x)
                    && (object.position.z === highlightMesh.position.z)
            });

            if(!objExist)
                highlightMesh.material.color.setHex(0xFFFFFF);
            else
                highlightMesh.material.color.setHex(0xFF0000);
        }
    });
});


const sphereMesh = (color) => new THREE.Mesh(
    new THREE.SphereGeometry(0.3),
    new THREE.MeshBasicMaterial({
        wireframe: false,
        color: color,
        visibility: true
    })
);

const gui = new dat.GUI();
const objects = [];
const allSpheres = [];

const filtersFolder = gui.addFolder('Filters');

const visibilityController = filtersFolder.add({ visible: true }, 'visible')
    .name('Display / Hide All')
visibilityController.onChange(function (value) {
    allSpheres.forEach(function (sphere) {
        sphere.visible = value;
    });
});



const wireframeController = filtersFolder.add({ wireframe: false }, 'wireframe').name('Wireframe');
wireframeController.onChange(function (value) {
    allSpheres.forEach(function (sphere) {
        sphere.material.wireframe = value;
    });
});

window.addEventListener('mousedown', function (){
    const objExist = objects.find(function(object){
        return (object.position.x === highlightMesh.position.x)
            && (object.position.z === highlightMesh.position.z)
    });
    if(!objExist){
        intersects.forEach(function (intersect){
            if(intersect.object.name === 'ground'){

                let extColor;
                do {
                    extColor = Math.random() * 0xffffff;
                } while (extColor === 0xff0000);

                const sphere = sphereMesh(extColor).clone();
                sphere.position.copy(highlightMesh.position);
                scene.add(sphere);
                objects.push(sphere);
                allSpheres.push(sphere);

                highlightMesh.material.color.set(extColor);

                const sphereNumber = objects.length;
                // sphereId++;

                const sphereFolder = gui.addFolder(`Sphere ${sphereNumber}`);
                // sphereFolder.open();

                const meshFolder = sphereFolder.addFolder('Mesh Material')
                // Add a boolean variable for visibility control

                let sphereVisible = true;
                const visibilityController = meshFolder.add({ visible: sphereVisible }, 'visible').name("Visibility");
                // how visibility works
                visibilityController.onChange(function (value) {
                    sphereVisible = value;
                    sphere.visible = sphereVisible; // Set sphere visibility based on the boolean value
                });


                meshFolder.add(sphere.material, 'wireframe');

                // Store the previous color
                let previousColor = sphere.material.color.clone();

                /*meshFolder.addColor(sphere, "color").onChange(function (color){
                    sphere.material.color = new THREE.Color(color);
                });*/

                const otherFolder = sphereFolder.addFolder('Other');

                let isPlaying = false;
                const playController = otherFolder.add({ playing: isPlaying }, 'playing').name("Play");

                playController.onChange(function (value) {
                    isPlaying = value;

                    if (isPlaying) {
                        sphere.material.color.setHex(0xff0000); // Set sphere color to red
                    } else {
                        sphere.material.color.copy(previousColor); // restore previous color
                    }
                });
            }
        });
    }
});


const numParticles = 0;
// GRID and AXIS
const gridHelper = new THREE.GridHelper(20 + numParticles, 20 + numParticles);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

function animate(time) {
    highlightMesh.material.opacity = 1 + Math.sin(time / 120);

    objects.forEach(function (object){
        object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1200));
    });
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});