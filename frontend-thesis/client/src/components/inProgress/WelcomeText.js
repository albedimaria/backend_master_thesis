import React, {useEffect, useRef, useState} from "react";
import {Center, Text3D} from "@react-three/drei"
import { useMatcapTexture } from "@react-three/drei";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import {Debug, InstancedRigidBodies, Physics, RigidBody} from "@react-three/rapier";

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)
const material = new THREE.MeshMatcapMaterial()

export default function WelcomeText(){

    const sphereRef = useRef([]);
    const textRef = useRef();
    const textSize = 1
    const textHeight = 0.2
    const [ matcapTexture ] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
    const [clicked, setClicked] = useState(false)
    const [visible, setVisible] = useState(false)


    useEffect(() =>
    {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true

    }, []);

    const onClick = () => {
        setClicked(true);
    };

    const doubleClick = () => {
        setVisible(false)
    }

    useFrame((state, delta) => {
        textRef.current.lookAt(state.camera.position);
    });

    return <>
        <group
            ref={ textRef }
            position={[20, 12, 0]}
            visible={visible}
            onClick={ onClick }
            onDoubleClick={ doubleClick }
        >
            <Center>
                <Text3D font={"./helvetiker_regular.typeface.json"}
                        size={ textSize }
                        height={ textHeight }
                        curveSegments={ 12 }
                        bevelEnabled
                        bevelThickness={ 0.02 }
                        bevelSize={ 0.02 }
                        bevelOffset={ 0 }
                        bevelSegments={ 5 }
                >
                    {clicked ? "DoubleTap" : "Welcome"}

                    <meshMatcapMaterial matcap={ matcapTexture }/>
                </Text3D>
            </Center>

            <mesh
            >
                <boxGeometry args={[textSize * 7.5, textHeight * 12, 0.2]} />
                <meshStandardMaterial color={'rgb(0,0,0)'} />
            </mesh>

            <mesh>
                <boxGeometry args={[textSize * 7.5 + 0.1, textHeight * 12 + 0.1, 0.1]} />
                <meshStandardMaterial color={'rgb(255,255,255)'} />
            </mesh>

        </group>


            {/*    { [...Array(100)].map((value, index) =>

                    <mesh
                        // ref = { (element) => sphereRef.current[index] = element }
                        geometry = { sphereGeometry }
                        material = { material }
                        // key = { index }
                        position={ [
                            (Math.random() - 0.5) * 10,
                            (Math.random() + 0.5) * 30,
                            (Math.random() - 0.5) * 10
                        ] }
                        scale = { 0.2 + Math.random() * 0.2 }
                    />



                ) }*/}

    </>

}