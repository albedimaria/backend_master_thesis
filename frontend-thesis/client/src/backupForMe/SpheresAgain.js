import * as THREE from 'three';
import { Debug, InstancedRigidBodies, Physics, RapierRigidBody, RigidBody} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import { Html } from "@react-three/drei";
import { button, folder, useControls} from "leva";
import { useNumSpheres } from "./NumSpheresContext";
import { useLabels } from "./LabelsContext";
import { useOptions } from "./OptionsContext";
import { useSliders } from "./SlidersContext";

//const sphereMaterial = new THREE.MeshStandardMaterial();


function SpheresStart() {
    const { numSpheres, setNumSpheres, incrementNumSpheres, decrementNumSpheres } = useNumSpheres();
    // const { BPM, Texture, Mood, Danceabilty } = useLabels();

    const [sphereSegments, setSphereSegments] = useState(8);
    const [visible, setVisible] = useState(true)
    // const [htmlVisibility, setHtmlVisibility] = useState(Array(numSpheres).fill(true))


    const sphereGroupRef = useRef();
    const labelRef = useRef([]);

    const [sphereSize, setSphereSize] = useState(0.7)

    // SPHERES CONTROLS
    const [ sphereSizeControl, set] = useControls('spheres', () => ({

        sphereSizeControl: {
            value: sphereSize,
            step: 0.1,
            min: 0.1,
            max: 1,
            label: 'Sphere Size',
            onChange: (value) => setSphereSize(value),
        },

        buttons: folder({
            lowerResolution: button(() => {
                setSphereSegments((prevSphereSegments) => prevSphereSegments / 2);
            }),
            higherResolution: button(() => {
                setSphereSegments((prevSphereSegments) => prevSphereSegments * 2);
            }),
            displayAll: button(() => {
                setVisible(true);
            }),

            // DA RIVEDERE

            /* displayAllText: button(() => {
                 setHtmlVisibility(true);
             }),*/

            addSphere: button(() => {
                incrementNumSpheres();
            }),
            removeSphere: button(() => {
                decrementNumSpheres();
            }),
        }),

    }));

    // POSITION
    const {
        selectedOptionX, setSelectedOptionX,
        selectedOptionY, setSelectedOptionY,
        selectedOptionZ, setSelectedOptionZ
    } = useOptions()

    // FILTERS
    const {
        bpmSelected, setBpmSelected,
        textureSelected, setTextureSelected,
        danceabilitySelected, setDanceabilitySelected,
        moodSelected, setMoodSelected
    } = useSliders()

    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(sphereSize, sphereSegments, sphereSegments), [sphereSize, sphereSegments]);

    const longLeftClick = (event) => {
        console.log('long left click occurred')
    }

    const colors = useMemo(() => {
        const colorsArray = [];
        for (let i = 0; i < numSpheres; i++) {
            const color = new THREE.Color().setHSL(i / numSpheres, 1, 0.5);
            colorsArray.push(color);
        }
        return colorsArray;
    }, [numSpheres]);

    const calculatePosition = (i) => {

        const normalizeFactor = 20

        const optionCalculations = {

            BPM: (i) => ((i / numSpheres) * 20 + 10).toFixed(1),
            Texture: (i) => (numSpheres / 2 - 1),
            Danceabilty: (i) => numSpheres / 4 - 2,
            Mood: (i) => -i + numSpheres,
        };

        const positionX = optionCalculations[selectedOptionX]?.(i) || 0;
        const positionY = optionCalculations[selectedOptionY]?.(i) || 1;
        const positionZ = optionCalculations[selectedOptionZ]?.(i) || 0;

        return [positionX, positionY, positionZ];

    };


    useEffect(() => {
        for (let i = 0; i < numSpheres; i++) {

            const [positionX, positionY, positionZ] = calculatePosition(i)
            const visibility = calculateVisibility(i, moodSelected, textureSelected, danceabilitySelected)


            const matrix = new THREE.Matrix4();

            matrix.compose(
                new THREE.Vector3(positionX, positionY, positionZ),
                new THREE.Quaternion(),
                new THREE.Vector3(1, 1, 1)
            );
            sphereGroupRef.current.setMatrixAt(i, matrix);
            sphereGroupRef.current.setColorAt(i, colors[i]);


        }

        sphereGroupRef.current.instanceMatrix.needsUpdate = true
        sphereGroupRef.current.instanceColor.needsUpdate = true

    }, [numSpheres, selectedOptionX, selectedOptionY, selectedOptionZ,  moodSelected, textureSelected, danceabilitySelected])


    const calculateVisibility = (i, moodSelected, textureSelected, danceabilitySelected) => {
        // Add your desired logic here based on the slider values
        return (
            i % 2 !== 0 &&
            moodSelected !== 'NoMood' &&
            textureSelected > 2 &&
            danceabilitySelected < 50
        );
    };

    /*    const featuresVisibility = (i) => {
            return true
            console.log('true')
        }*/

    const [featureVisibility, setFeatureVisibility] = useState(Array(numSpheres).fill(true));

    const handleLeftClick = (i) => {
        setFeatureVisibility((prevVisibility) => {
            const updatedVisibility = [...prevVisibility];
            updatedVisibility[i] = !prevVisibility[i];
            return updatedVisibility;
        });
        console.log(`Left click on label ${i}`);
    };


// HTML
    const labelsHtml = visible
        ? Array.from({ length: numSpheres }, (_, i) => {

            const positionOpt = calculatePosition(i)

            const positionLabels = [
                positionOpt[0],
                positionOpt[1] + sphereSize * 1.4 + 0.6,
                positionOpt[2]
            ]
            const featureLabels = [
                positionOpt[0],
                positionOpt[1] - sphereSize * 0.8 - 0.6,
                positionOpt[2] + sphereSize * 1.4 + 0.3
            ]

            return <>
                <Html
                    key={i}
                    position={positionLabels}
                    wrapperClass="label"
                    center
                    distanceFactor={16}
                    occlude={[sphereGroupRef, ...labelRef.current]}
                    ref={(ref) => (labelRef.current[i] = ref)}
                >

                    sphere {i}
                </Html>

                {featureVisibility[i] && (
                    <Html
                        // key={`feature-${i}`}
                        position={featureLabels}
                        wrapperClass="features"
                        center
                        distanceFactor={16}
                        onClick={() => handleLeftClick(i)}

                        // onClick={ leftClick }
                        occlude={[sphereGroupRef, ...labelRef.current]}
                        // ref={(ref) => (labelRef.current[i] = ref)}
                    >
                        {selectedOptionX} : {positionLabels[0]} <br/>
                        {selectedOptionY}: {positionLabels[1]} <br/>
                        {selectedOptionZ}: {positionLabels[2]} <br/>

                    </Html> )}
            </>


        })
        : null;





    return <>
        <group visible={visible}>
            <instancedMesh
                // onClick={ leftClick }
                ref={sphereGroupRef}
                args={[null, null, numSpheres]}
                geometry={sphereGeometry}
                // material={ sphereMaterial }
            >
                <meshStandardMaterial />
                {labelsHtml}

            </instancedMesh>
        </group>


    </>

}

export default function Spheres() {
    return (
        <>
            <SpheresStart />
        </>
    );
}
