import React, {StrictMode} from "react"
import ReactDOM from "react-dom/client"
import {Canvas} from "@react-three/fiber";
import '../style.css';

import { ACESFilmicToneMapping } from "three";
import Plane from "../Plane";
import Spheres from "../Spheres";
import LightsAndShadows from "../LightsAndShadows";
import * as THREE from "three";
import EntryText from "../EntryText";
import { NumSpheresProvider } from '../NumSpheresContext';
import {Leva} from "leva";




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <StrictMode>
            <Leva

            />
            <Canvas
                shadows={true}
                dpr={[1, 2]}
                flat
                gl={{
                    antialiasing: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                }}
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [0, 10, 15],
                }}
            >

                <LightsAndShadows/>
                <EntryText/>
                <NumSpheresProvider>
                    <Plane/>
                    <Spheres/>
                </NumSpheresProvider>

            </Canvas>

        </StrictMode>

    </>

)