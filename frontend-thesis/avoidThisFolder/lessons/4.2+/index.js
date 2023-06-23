import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import './style.css';
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";
import * as THREE from 'three';
import {CineonToneMapping} from "three";
import { StrictMode } from 'react';
import {Leva} from "leva";
import { Perf } from "r3f-perf";



const root = ReactDOM.createRoot(document.getElementById('root'));

/*const created = ({scene}) => {
    scene.background = new THREE.Color('#ffffff', 0.8)
}*/

root.render(
    <StrictMode>
        <Leva/>
        <Canvas
            shadows={true}
            dpr={[1,2]}    // pixel ration (default values for R£F)
            flat           // for tone mapping
            gl={{
                antialiasing: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                // outputEncoding: THREE.LinearEncoding
            }}
            // orthographic
            camera={{
                fov: 45,
                // zoom: 70,
                near: 0.1,
                far: 200,
                position: [3,2,6]
            }}
            // onCreated={created}
        >




            <Experience/>
        </Canvas>

    </StrictMode>



/*  <React.StrictMode>
    <App />
  </React.StrictMode>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
