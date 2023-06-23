import * as THREE from 'three';
import {Debug, InstancedRigidBodies, Physics} from "@react-three/rapier";
import {useEffect, useMemo, useRef, useState} from "react";
import React from "react";

const numSpheres = 2;
const sphereSize = 0.5;
const sphereSegments = 32;
const sphereGeometry = new THREE.SphereGeometry(sphereSize, sphereSegments, sphereSegments);
const sphereMaterial = new THREE.MeshStandardMaterial();


function SpheresStart() {
    const sphereGroupRef = useRef();
    const spheresRef = useRef([]);
    const [randomColor, setRandomColor] = useState(() => Math.random());

    /*  useEffect(() => {
          for(let i = 0; i < numSpheres; i++)
          {
              const matrix = new THREE.Matrix4()
              matrix.compose(
                  new THREE.Vector3(i * 2 -9, sphereSize, 0),
                  new THREE.Quaternion(),
                  new THREE.Vector3(1, 1, 1)
              )
              sphereGroupRef.current.setMatrixAt(i, matrix)
          }
      }, [])*/

    const spheresTransforms = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []
        const indexes = []

        console.log("indexes:", indexes)
        console.log("len of first indexes", indexes.length)


        for(let i = 0; i < numSpheres; i++)
        {
            positions.push([i * 2 -9, sphereSize, 0])
            rotations.push([0, 0, 0])
            scales.push([1, 1, 1])
            indexes.push(i)
        }

        return {positions, rotations, scales, indexes}

    }, []);

    console.log("indexes again", spheresTransforms.indexes)
    console.log("len of indexes", spheresTransforms.indexes.length)


    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            // Perform any logic specific to the first render here

            // Render the spheres using the mapping logic
            return () => {
                // Cleanup logic if needed
            };
        }
    }, []);

    return (
        <>
            <Physics gravity={[0, 0, 0]}>
                <Debug />
                {isFirstRender.current && (
                    <InstancedRigidBodies
                        colliders={"ball"}
                        positions={spheresTransforms.positions}
                        rotations={spheresTransforms.rotations}
                        scales={spheresTransforms.scales}
                    >
                        {spheresTransforms.indexes.map((index) => (
                            <instancedMesh
                                key={index}
                                castShadow
                                receiveShadow
                                args={[null, null, numSpheres]}
                                geometry={sphereGeometry}
                                material={sphereMaterial}
                            />
                        ))}
                    </InstancedRigidBodies>
                )}
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
