import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui';
import stars from '../img/jake-weirick-Q_RBVFFXR_g-unsplash.jpg'
import nebula from '../img/nasa-rTZW4f02zY8-unsplash.jpg'

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// camera.position.z = 5;cd
camera.position.set(0, 2, 5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;


const sphereGeometry = new THREE.SphereGeometry();
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-1, 1, 0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

/*
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-10, 10, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);
*/

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-10, 10, 0);
spotLight.castShadow = true;

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0xAAAAAA);
scene.add(spotLightHelper);

//scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

// renderer.setClearColor(0xAAAAAA);
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars);

const box2Geom = new THREE.BoxGeometry(3, 3, 3);
const box2Material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(nebula)
});
const box2 = new THREE.Mesh(box2Geom, box2Material);
scene.add(box2);
box2.position.set(0, 5, 2);

const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
};

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
})

let step = 0;

gui.add(options, 'speed', 0, 0.1)
gui.add(options, 'angle', 0, 1)
gui.add(options, 'penumbra', 0, 1)
gui.add(options, 'intensity', 0, 1)

const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove', function (e){
    mousePosition.x = (e.clientX / window.innerWidth ) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;

})

const rayCaster = new THREE.Raycaster();
const sphereId = sphere.id;
box2.name = 'theBox';

function animate(time){
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    //console.log(intersects);

    for(let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === sphereId)
            intersects[i].object.material.color.set(0xFF0000);

        if (intersects[i].object.name === 'theBox') {
            intersects[i].object.rotation.x = time / 1000;
            intersects[i].object.rotation.y = time / 1000;
        }
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// make it responsive

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});







