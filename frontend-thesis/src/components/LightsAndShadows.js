import React, {useEffect, useRef} from 'react';
import {OrbitControls, PerspectiveCamera, useHelper} from '@react-three/drei'
import {DirectionalLightHelper} from "three";
import { useFrame} from "@react-three/fiber";
import { useKeyboardControls} from "@react-three/drei";
import {useNumSpheres} from "../contexts/NumSpheresContext";

export default function LightsAndShadows() {

    const dirLight = useRef();
    const cameraRef = useRef();


    const [subscribeKeys, getKeys] = useKeyboardControls()

    // useHelper(dirLight, DirectionalLightHelper)

    const { numSpheres, incrementNumSpheres } = useNumSpheres();

    const jump = () => {
        incrementNumSpheres();
    };
    // console.log(numSpheres)

    useEffect(() => {
        subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value) {
                    jump();
                }
            }
        );
    }, [numSpheres]);




    return <>


        <directionalLight
            ref={dirLight}
            castShadow
            position={ [ -5, 10, 0 ] }
            intensity={ 1.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }

        />

        <ambientLight
            intensity={1}
            /*color={'#cadcde'}            */

        />


    </>
}