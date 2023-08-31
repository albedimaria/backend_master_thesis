import * as THREE from 'three'
import {Html, MeshReflectorMaterial, useHelper, useKeyboardControls} from '@react-three/drei'
import '../styles/style.css'
import {Debug, InstancedRigidBodies, Physics, RigidBody} from "@react-three/rapier";
import {useEffect, useRef, useState} from "react";
import {useLabels} from "../contexts/LabelsContext";
import {useOptions, useOptionsX} from "../contexts/OptionsContext";
import {useNumSpheres} from "../contexts/NumSpheresContext";

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#000000'})



function PlaneStart() {
    const heightPlane = 0.2;
    const planeRef = useRef();
    const axisRefs = useRef([]);

    const { selectedOptionX, selectedOptionY, selectedOptionZ } = useOptions()
    const {
        BPM_label, Texture_label, Key_label,
        Instrument_label, Mood_label, Danceability_label
    } = useLabels()

    const { numSpheres } = useNumSpheres()

    const scalingFactor = { x: 50, y: heightPlane / 2, z: 35 };

    const leftClick = (event) =>
    {
        console.log('left click occurred')

    }

    const longLeftClick = (event) => {
        planeRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }

    const doubleLeftClick = (event) => {
        // planeRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        console.log('DOUBLE')
    }

    const onPointerOver = (event) => {
        // planeRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)

        console.log('crossed paths')
    }

    const onClick = (event) => {
    }



    const getLabelText = (option) => {
        switch (option) {
            case 'BPM':
                return BPM_label;
            case 'Texture':
                return Texture_label;
            case 'Mood':
                return Mood_label;
            case 'Danceability':
                return Danceability_label;
            case 'Key':
                return Key_label;
            case 'Instrument':
                return Instrument_label;
            default:
                return '';
        }
    };

    const getLabelX = () => getLabelText(selectedOptionX);
    const getLabelY = () => getLabelText(selectedOptionY);
    const getLabelZ = () => getLabelText(selectedOptionZ);



    return (
        <>
{/*            <Physics gravity={[0, -5, 0]}>
                <RigidBody type={"fixed"}>*/}
                    <group>
                        <mesh
                            // onClick={ leftClick }
                            // onContextMenu={ longLeftClick }

                            // onDoubleClick={ doubleLeftClick }

                            // HIGH CPU PERFORMANCE
                            // onPointerEnter={ () => {document.body.style.cursor = 'pointer'} }
                            // onPointerLeave={ () => {document.body.style.cursor = 'default'} }


                            ref={planeRef}
                            geometry={boxGeometry}
                            material={boxMaterial}
                            scale={[scalingFactor.x, scalingFactor.y, scalingFactor.z]}
                            // receiveShadow
                            position={[scalingFactor.x / 2, -heightPlane / 4, 0]}
                        />
                    </group>
              {/*  </RigidBody>*/}

                 {/*   <InstancedRigidBodies
                    >
                        <instancedMesh
                            position={[Math.random() * 10 + 10, 15, 0]}
                            args={[null, null, 3]}
                        >
                            <sphereGeometry />
                            <meshStandardMaterial color={'#ffffff'} />
                        </instancedMesh>
                    </InstancedRigidBodies>*/}


{/*
            </Physics>
*/}



            <axesHelper scale={[scalingFactor.x, scalingFactor.x / 3, scalingFactor.z]} position={[0, 0, -scalingFactor.z / 2]} />

            <group>
                <Html position={[- 2, 0, 0]} wrapperClass="label" center distanceFactor={18} occlude={[planeRef, axisRefs.current[0]]}            >
                    { getLabelZ() }
                </Html>

                <Html position={[0, scalingFactor.x / 2.7, -scalingFactor.z / 2]} wrapperClass="label" center distanceFactor={18} occlude={[planeRef, axisRefs.current[1]]}>
                    { getLabelY() }
                </Html>

                <Html position={[scalingFactor.x / 2, -1, scalingFactor.x / 4 -2]} wrapperClass="label" center distanceFactor={18} occlude={[planeRef, axisRefs.current[2]]}>
                    { getLabelX() }
                </Html>
            </group>


{/*
            <gridHelper args={[scalingFactor.x, scalingFactor.x / 3, scalingFactor.z]} position={[scalingFactor.x / 2, 0, -scalingFactor.z / 2 - 1]} />
*/}
        </>
    );
}



export default function Plane()
{
    return <>
        <PlaneStart/>
    </>
}