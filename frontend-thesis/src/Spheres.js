import * as THREE from 'three';
import {Debug, InstancedRigidBodies, Physics} from "@react-three/rapier";
import {useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import {Html} from "@react-three/drei";
import {button, folder, useControls} from "leva";

const numSpheres = 4;
const sphereSize = 0.2;
const sphereSegments = 32;
const sphereGeometry = new THREE.SphereGeometry(sphereSize, sphereSegments, sphereSegments);
const sphereMaterial = new THREE.MeshStandardMaterial({color : 0x000000});


function SpheresStart() {

    const sphereGroupRef = useRef([]);
    const labelRef = useRef();

    const [selectedOption, setSelectedOption] = useState('a');
    const [sphereName, setSphereName] = useState('');


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
            options: ['BPM', 'Texture', 'Mood'],

        }
    }));

    useEffect(() => {
        // Update sphereName based on selectedOption
        switch (selectedOption) {
            case 'BPM':
                setSphereName('Option A Selected');
                break;
            case 'Texture':
                setSphereName('Option B Selected');
                break;
            case 'Mood':
                setSphereName('Option C Selected');
                break;
            default:
                setSphereName('Sphere number');
        }
    }, [selectedOption]);

    const spheresTransforms = useMemo(() => {
        const positions = [];
        const rotations = [];
        const scales = [];
        const indexes = [];
        const colors = [];

        for (let i = 0; i < numSpheres; i++) {
            positions.push([ i * 2 , sphereSize + 1.5, 0]);
            rotations.push([0, 0, 0]);
            scales.push([1, 1, 1]);
            indexes.push(i);
            colors.push( 0xffffff * Math.random());
        }

        return { positions, rotations, scales, indexes, colors };
    }, [numSpheres]);



    const colorsMemo = useMemo(() => {
        return Array.from({ length: numSpheres }, (_, index) => ({
            color: spheresTransforms.colors[index]
        }));
    }, [numSpheres, spheresTransforms.colors]);


    const sphereLabels = spheresTransforms.indexes.map((index) => {
        // const sphereNameDef = `Sphere ${index + 1}`

        return (
            <Html
                ref={labelRef}
                key={index}
                position={[index * 2, 2.5, 0]}
                wrapperClass="label"
                center
                distanceFactor={12}
                occlude={[sphereGroupRef, labelRef]}
            >
                {sphereName}

            </Html>
        );
    });


    return (
        <>
            <Physics gravity={[0, 0, 0]}>
                <Debug />
                <InstancedRigidBodies
                    colliders="ball"
                    positions={spheresTransforms.positions}
                    rotations={spheresTransforms.rotations}
                    scales={spheresTransforms.scales}
                    indexes={spheresTransforms.indexes}

                >


                        <group visible={visible}>
                            <instancedMesh
                                ref={sphereGroupRef}
                                castShadow
                                receiveShadow
                                geometry={sphereGeometry}
                                args={[null, null, numSpheres]}
                            >
                                <meshStandardMaterial color={spheresTransforms.colors[0]} />
                                {sphereLabels}
                            </instancedMesh>
                        </group>

                </InstancedRigidBodies>
            </Physics>



        </>
    );
}

export default function Spheres() {
    return (
        <>
            <SpheresStart />
        </>
    );
}
