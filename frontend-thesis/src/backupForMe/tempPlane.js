import React, {useRef, useEffect, useMemo} from "react";
import {Physics, Debug, RigidBody, InstancedRigidBodies, CuboidCollider} from "@react-three/rapier";
import * as THREE from "three";
import {MeshReflectorMaterial} from "@react-three/drei";
import ReactDOM from'react-dom';
import { Html, PivotControls} from "@react-three/drei";
import {button, folder, useControls} from 'leva';

import { useNumSpheres } from '../NumSpheresContext';
import '../style.css'
import { useLocalStorage } from 'react-use';
import {Debug, BallCollider ,Physics, RigidBody} from "@react-three/rapier";

import {useFrame} from "@react-three/fiber";


export default function Plane() {

    return (
        <>
            <Physics gravity={[0, -10, 0]}>

                <Debug/>

                <RigidBody type={"fixed"}
                           ref={planeRigid}
                           colliders="cuboid"
                           restitution={0}
                           friction={0}

                >

                    <mesh
                        ref={planeRef}
                        scale={[scaling.x, scaling.y, 0.1]}
                        position={[0, -0.5, 0]}
                        rotation-x={-Math.PI / 2}
                        onClick={() => {
                            planeJump()
                            console.log(planeRigid.current)
                        }
                        }


                    >
                        <boxGeometry args={[1, 1, 1]}/>
                        <MeshReflectorMaterial
                            resolution={1024}
                            blur={[1000, 10]}
                            mix={0.2}
                            side={THREE.DoubleSide}
                            mirror={1}
                        />
                    </mesh>

                </RigidBody>

                <RigidBody
                    position={[0, 0, 0]}
                    type="kinematicPosition"
                    ref={twister}
                    onCollisionExit={() => {
                        console.log('collision exit')
                    }}
                >
                    <mesh castShadow scale={[0.4, 0.4, 3]}>
                        <boxGeometry/>
                        <meshStandardMaterial color="red"/>
                    </mesh>


                </RigidBody>

                <RigidBody
                    position={[0, 10, 0]}
                >
                    <mesh castShadow scale={[0.4, 0.4, 3]}>
                        <boxGeometry/>
                        <meshStandardMaterial color="green"/>
                    </mesh>
                </RigidBody>

                <RigidBody type="fixed">
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]}/>
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]}/>
                    <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]}/>
                    <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]}/>
                </RigidBody>

                <InstancedRigidBodies
                    positions={cubesTransforms.positions}
                    rotations={cubesTransforms.rotations}
                    scales={cubesTransforms.scales}
                >
                    <instancedMesh castShadow ref={cubes} args={[null, null, 1]}>
                        <boxGeometry/>
                        <meshStandardMaterial color="blue"/>

                    </instancedMesh>
                </InstancedRigidBodies>

            </Physics>
        </>
    );
}