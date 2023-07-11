import ReactDOM from "react-dom/client";
import {StrictMode, useMemo} from "react";
import {Leva} from "leva";
import {Canvas} from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

    <>


        <StrictMode>
            <Leva />
            <KeyboardControls
                map={ [
                    { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
                    { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
                    { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
                    { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
                    { name: 'jump', keys: [ 'Space' ] },
                ] }
            >
                <Canvas
                    shadows={true}
                    dpr={[1, 2]}
                    flat
                    gl={{
                        antialiasing: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                    }}
                    camera={{
                        fov: 75,
                        near: 0.1,
                        far: 200,
                        position: [20, 20, 25],
                    }}
                >
                    <Experience />
                </Canvas>
            </KeyboardControls>

        </StrictMode>
    </>
)