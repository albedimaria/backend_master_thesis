import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

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

const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 4,2),
    new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xFF0000
    })
);

const objects = [];

window.addEventListener('mousedown', function (){
    const objExist = objects.find(function(object){
        return (object.position.x === highlightMesh.position.x)
            && (object.position.z === highlightMesh.position.z)
    });
    if(!objExist){
        intersects.forEach(function (intersect){
            if(intersect.object.name === 'ground'){
                const sphereClone = sphereMesh.clone();
                sphereClone.position.copy(highlightMesh.position);
                scene.add(sphereClone);
                objects.push(sphereClone);
                highlightMesh.material.color.setHex(0xFF000);
            }
        });
    }
});
// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(20, 20);
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