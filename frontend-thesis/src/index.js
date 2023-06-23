import ReactDOM from "react-dom/client";
import {StrictMode, useMemo} from "react";
import {Leva} from "leva";
import {Canvas} from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import {KeyboardControls} from "@react-three/drei";



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

    <>


        <StrictMode>
            <Leva />
{/*
            <KeyboardControls map={map} />
*/}
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
                <Experience />
            </Canvas>

        </StrictMode>
    </>
)