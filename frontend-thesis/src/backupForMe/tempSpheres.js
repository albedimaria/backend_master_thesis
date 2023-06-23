import react, {useEffect, useMemo, useState} from 'react';
import ReactDOM from'react-dom';
import { useRef } from'react';
import { Html, PivotControls} from "@react-three/drei";
import * as THREE from 'three';
import {button, folder, useControls} from 'leva';

import { useNumSpheres } from '../NumSpheresContext';
import '../style.css'
import { useLocalStorage } from 'react-use';
import {Debug, BallCollider ,Physics, RigidBody} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";





export default function TempSpheres() {


    const [{visible, setVisible}, set] = useControls('spheres', () => ({

        visible: true,

        buttons: folder({

            hide: button(() => {
                set({visible: false});
            }),
            show: button(() => {
                set({visible: true});
            }),

            clickMe2: button(() => {
            }),
            clickMe3: button(() => {
            }),

        }),
        choices: {
            options: ['a', 'b', 'c'],

        }

    }));




    const spheresRef = useRef();
    const sphereRigids = useRef([]);


    const sphereSize = 0.5
    const sphereSegments = 32
    // const {numSpheres} = useNumSpheres();
    const {numSpheres} = 2


    const labelRef = useRef();

    const getRandomColor = () => Math.random() * 0xffffff;


    /* Better but don't know how to do
      const [storedColors, setStoredColors] = useLocalStorage('sphereColors');
      const colors = storedColors ? JSON.parse(storedColors) : Array.from({ length: numSpheres }, () => getRandomColor());

      useEffect(() => {
          setStoredColors(JSON.stringify(colors));
      }, [colors, setStoredColors]);*/

    let storedColors = localStorage.getItem('sphereColors');
    let colors = storedColors ? JSON.parse(storedColors) :
        Array.from({length: numSpheres}, () => getRandomColor());


    useEffect(() => {
        localStorage.setItem('sphereColors', JSON.stringify(colors));
    }, [colors]);


    const positionsMemo = useMemo(
        () =>
            Array.from({length: numSpheres}, (_, index) => ({
                position: [
                    index * 2 - (numSpheres - 1), // x
                    (numSpheres - index) * 0.0, // y
                    0, // z
                ],
                color: colors[index], // color
            })),
        [numSpheres, colors]
    );

    const sphereJump = (index) => {
        console.log(sphereRigids.current[index])
        // sphereRigids.current[index].applyImpulse({x: 0, y: 3, z: 0})
    }



    return (
        <group ref={spheresRef} visible={visible}>
            {positionsMemo.map(({position, color}, index) => (

                <Physics gravity={[0, 0, 0]} key={index}>
                    <Debug/>

                    <RigidBody
                        colliders="ball"
                        ref={ref => (sphereRigids.current[index] = ref)}
                        /*type="fixed"*/
                    >
                        <mesh
                            position={position}
                            onClick={() => sphereJump(index)}
                        >
                            <sphereGeometry args={[sphereSize, sphereSegments, sphereSegments]}/>
                            <meshStandardMaterial color={color}/>
                            {visible && (
                                <Html
                                    ref={labelRef}
                                    position={[0, 1, 0]}
                                    wrapperClass="label"
                                    center
                                    distanceFactor={12}
                                    occlude={[spheresRef, labelRef]}
                                >
                                    Sphere {index}
                                </Html>
                            )}
                        </mesh>

                    </RigidBody>
                </Physics>
            ))}
        </group>
    )

}
