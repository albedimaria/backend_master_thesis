import React, {useRef} from "react"
/*import {useThree, extend, useFrame} from "@react-three/fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"*/
/*extend({OrbitControls})*/
import {useFrame} from "@react-three/fiber";
import CustomObject from "./CustomObject.js";
import * as THREE from 'three'
import { PivotControls } from "@react-three/drei";
import { Stage, Lightformer, Environment, Sky, AccumulativeShadows, softShadows, BakeShadows, TransformControls, OrbitControls, useHelper } from "@react-three/drei";
import { Html, Text, Float, MeshReflectorMaterial } from "@react-three/drei";
import { folder, button, useControls } from "leva";
import {Perf} from "r3f-perf";



/*softShadows({
    frustum: 3.75,
    size: 0.005,
    near: 9.5,
    samples: 17,
    rings: 11
})*/


export default function Experience(){

    const eventHandler = () => {
        cubeRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        //console.log('event occurred')
    }


    const {perfVisible} = useControls('performances', {
        perfVisible: false
})
    const {position, color, visible} = useControls('sphere',{
        position: {
            value: {x:-2, y:0},
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        myInterval:{
            min: 0,
            max: 10,
            value: [3,7]
        },
        clickMe: button(() => {

        }),
        choice: {options: ['a', 'b', 'c']}
    })

    const {cubeScale} = useControls('cube', {
        cubeScale:{
            value: 1.5,
            min: 0,
            max: 5
        }
    })

/*    const { sunPosition } = useControls('sky', {
        sunPosition:{
            value: [1, 2, 3]
        }
    })*/


    /*const {camera, gl} = useThree()*/
    const cubeRef = useRef()
    const sphereRef = useRef()
    const planeRef = useRef()
    const groupRef = useRef()

    const direcLightRef = useRef()
    useHelper(direcLightRef, THREE.DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime

        /*
        state.camera.position.x = Math.sin(time) *5
        state.camera.position.z = Math.cos(time) *5
        state.camera.lookAt(0,0,0)
        */

        // cubeRef.current.position.x = 2 + Math.sin(time)
        // cubeRef.current.rotation.y += delta * 0.2
        // groupRef.current.rotation.y += delta      // for practice only

    });




    return <>
      {/*  <Environment

            preset={"sunset"}
            ground={{
                height: 7,
                radius: 28,
                scale: 100
            }}
        >
            < color args={['#000000']} attach="background"/>
            <Lightformer
                position-z={ -5 }
                scale={10}
                intensity={10}
                color={"red"}
                form={"ring"}
            />
            <mesh position-z={ -5 } scale={ 10 }>
                    <planeGeometry/>
                    <meshBasicMaterial color="red"/>
            </mesh>
        </Environment>*/}

        {perfVisible ? <Perf position="top-left" /> : null}
        <OrbitControls enableDamping={true} makeDefault={true}/>

       {/* <BakeShadows/>*/}
        {/*        <orbitControls args={[camera, gl.domElement]}/>*/}


        <directionalLight
            castShadow={true}
            ref={direcLightRef}
            position={[1,2,3]}
            color="white"
            intensity={1}
          /*  shadow-mapSize={[1024, 1024]}
            shadow-camera-near = {1}
            shadow-camera-far = {10}
            shadow-camera-top = {5}
            shadow-camera-right = {5}
            shadow-camera-bottom = {- 5}
            shadow-camera-left= {- 5}*/
        />
        <ambientLight intensity={0.8}/>

{/*
        <Sky sunPosition={sunPosition}/>
*/}



       {/*     <PivotControls
                anchor={[0, 0, 0]}
                depthTest={false}
                lineWidth={1}
                axisColors={['#ff0000', '#00ff00', '#0000ff']}
                fixed={true}
                scale={100}
            >
                <mesh
                    castShadow={true}
                    position-y={ 1 }
                    ref={sphereRef} position={[position.x, position.y, 0]} visible={visible} >
                    <sphereGeometry />
                    <meshStandardMaterial color={color} wireframe={false}/>
                    <Html
                        position={[0, 1.2, 0]}
                        wrapperClass={"label"}
                        center={true}
                        distanceFactor={6}
                        occlude={[sphereRef, cubeRef]}
                    >Sphere</Html>

                </mesh>
            </PivotControls>*/}


           {/* <mesh
                position-y={ 1 }
                castShadow
                ref={cubeRef} position={[2, 0, 0]} scale={cubeScale}>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color= "mediumpurple" wireframe={false}/>
            </mesh>
            <TransformControls object={cubeRef} mode={"translate"}/>

            <Float
                speed={5}
                floatIntensity={2}
            >
                <Text
                fontSize={0.5}
                position-y={1.5}
                color={"darkblue"}
                maxWidth={2}
                textAlign={"center"}
                >
                    I LOVE CODING
                </Text>
            </Float>
        </group>*/}

          <mesh
                receiveShadow
                ref={planeRef} position-y={0} rotation-x={- Math.PI * 0.5} scale={10}

            >
                <planeGeometry />
                <meshStandardMaterial color="green" wireframe={false}/>
                <MeshReflectorMaterial
                resolution={ 512 }
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.75}
                side={THREE.DoubleSide}
                color={"green"}
                />
          </mesh>

      {/*      <Stage shadows={{type: 'contact', opacity: 0.2, blur: 3}}
                    environment="sunset"
                   preset={"portrait"}
                   intensity={ 2 }
            >*/}

                <mesh
                    castShadow
                    position-x={ - 2 } position-y={ 1 }
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                >
                    <sphereGeometry/>
                    <meshStandardMaterial color={'#ffc800'}/>
                </mesh>

                <mesh 
                    castShadow
                    ref={cubeRef}
                    position-x={ 2 } position-y={ 1 }
                    scale={ 1.5 }
                    onClick={ eventHandler }            // left click
                    onPointerEnter = {() => {document.body.style.cursor = 'pointer'}}
                    onPointerLeave = {() => {document.body.style.cursor = 'default'}}

                 /*   onContextmenu={ eventHandler }      // right click
                    onDoubleClick={ eventHandler }      // double click
                    onPoiterOver={ eventHandler }       // pointer over
                    onPointerMissed={ eventHandler }  */  // pointer out, can be called inside the canva
                >
                    <boxGeometry/>
                    <meshStandardMaterial color = {'#8000ff'}/>
                </mesh>
           {/* </Stage>*/}


    </>

}