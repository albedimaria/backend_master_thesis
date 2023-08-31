import * as THREE from 'three'
import {Html, MeshReflectorMaterial, useHelper, useKeyboardControls} from '@react-three/drei'
import './style.css'
import {Debug, InstancedRigidBodies, Physics, RigidBody} from "@react-three/rapier";
import {useEffect, useRef, useState} from "react";
import {useLabels} from "./LabelsContext";
import {useOptions, useOptionsX} from "./OptionsContext";
import {useNumSpheres} from "./NumSpheresContext";

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#000000'})



function PlaneStart() {
    const heightPlane = 0.2;
    const planeRef = useRef();
    const axisRefs = useRef([]);

    const { selectedOptionX, selectedOptionY, selectedOptionZ } = useOptions()
    const {BPM, Texture, Mood, Danceability} = useLabels()
    const { numSpheres } = useNumSpheres()

    const scalingFactor = { x: 40, y: heightPlane / 2, z: numSpheres * 2 };

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
                return BPM;
            case 'Texture':
                return Texture;
            case 'Mood':
                return Mood;
            case 'Danceability':
                return Danceability;
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

                <Html position={[0, scalingFactor.x / 2.5, -scalingFactor.z / 2]} wrapperClass="label" center distanceFactor={18} occlude={[planeRef, axisRefs.current[1]]}>
                    { getLabelY() }
                </Html>

                <Html position={[scalingFactor.x / 2, -1, scalingFactor.x / 4 -2]} wrapperClass="label" center distanceFactor={18} occlude={[planeRef, axisRefs.current[2]]}>
                    { getLabelX() }
                </Html>
            </group>


            {/*<gridHelper args={[scalingFactor.x, scalingFactor.z]} position={[0, 0, 0]} />*/}
        </>
    );
}



export default function Plane()
{
    return <>
        <PlaneStart/>
    </>
}