import ReactDOM from "react-dom/client";
import React, {StrictMode, Suspense, useMemo} from "react";
import {Leva} from "leva";
import {Canvas} from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import {KeyboardControls, Loader} from '@react-three/drei'
import {loaderStyles} from "./styles/LoaderStyles";
import Button from "./components/inProgress/Button";
import {MyDropzone} from "./components/inProgress/Drag&Drop";
import Plane from "./components/plane/Plane";
import Window from "./Window";
// import { backgroundStyle } from "./"


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
                        position: [30, 30, 30],
                        // update experience too
                    }}
                >
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>

                <Canvas>
                    <Window />
                </Canvas>
                
                <Loader
      /*              containerStyles={loaderStyles.container}
                    innerStyles={loaderStyles.inner}
                    barStyles={loaderStyles.bar}
                    dataStyles={loaderStyles.data}
                    dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
                    initialState={(active) => active}*/
                />
            </KeyboardControls>
        </StrictMode>
    </>
);