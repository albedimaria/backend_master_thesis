import * as THREE from 'three'
import {MeshReflectorMaterial, useHelper, useKeyboardControls} from '@react-three/drei'
import './style.css'
import {InstancedRigidBodies, RigidBody} from "@react-three/rapier";
import {useEffect, useRef, useState} from "react";
import {Controls} from "./KeyboardControls";
import {AxesHelper} from "three";

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#00ff00'})




function PlaneStart(){
    const heightPlane = 0.2
    const planeRef = useRef()

    useHelper(planeRef, AxesHelper)

    // const [planeScale, setPlaneScale] = useState([20, heightPlane / 2, 4]);

 /*   const resizeButton = useKeyboardControls(
        (state) => state[Controls.play])*/

 /*   useEffect(() => {
        if (resizeButton) {
            setPlaneScale(prevScale => [prevScale[0] * 2, prevScale[1] * 2, prevScale[2] * 2]);
        }
    }, [resizeButton]);*/


    return <>

        <RigidBody type={"fixed"} >
            <group>
                <mesh
                    ref={planeRef}
                    geometry={boxGeometry}
                    material={boxMaterial}
                    scale={[20, heightPlane / 2, 4]}
                    receiveShadow
                    position={[0, - heightPlane / 2, 0 ]}

                />
            </group>
        </RigidBody>


    </>



}

export default function Plane()
{
    return <>
        <PlaneStart/>
    </>
}