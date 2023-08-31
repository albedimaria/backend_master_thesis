import * as THREE from 'three';
import { Debug, InstancedRigidBodies, Physics, RapierRigidBody, RigidBody} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import { Html } from "@react-three/drei";
import { button, folder, useControls} from "leva";
import { useNumSpheres } from "../contexts/NumSpheresContext";
import { useOptions } from "../contexts/OptionsContext";
import { useSliders } from "../contexts/SlidersContext";
import {useLabels} from "../contexts/LabelsContext";
import { useSpheresProperties } from "../contexts/SpherePropertiesContext";

function SpheresStart() {
    const { numSpheres, setNumSpheres, incrementNumSpheres, decrementNumSpheres } = useNumSpheres();

    const [sphereSegments, setSphereSegments] = useState(8);
    const [visible, setVisible] = useState(true)

    const sphereGroupRef = useRef([])

    const labelRef = useRef([]);

    const [sphereSize, setSphereSize] = useState(0.7)
    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(sphereSize, sphereSegments, sphereSegments), [sphereSize, sphereSegments]);

    // const [featureVisibility, setFeatureVisibility] = useState(Array(numSpheres).fill(true))

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


    // FILTERS
    const {        bpmSelected,        textureSelected,        danceabilitySelected,        moodSelected,    } = useSliders()

    const longLeftClick = (event) => {
        console.log('long left click occurred')
    }

    // COLORS
    const colors = useMemo(() => {
        const colorsArray = [];
        for (let i = 0; i < numSpheres; i++) {
            const color = new THREE.Color().setHSL(i / numSpheres, 1, 0.5);
            colorsArray.push(color);
        }
        return colorsArray;
    }, [numSpheres]);

    // ARRAY OF PROPERTIES
    const { getBpm, getMood, getTexture, getDanceability, sphereData } = useSpheresProperties()

    // VISIBILITY
    const calculateVisibility = (i, moodSelected, textureSelected, danceabilitySelected) => {
        // Add your desired logic here based on the slider values
        if (
            bpmSelected < 100
        ) {
            return true;
        } else {
            return false;
        }
    };

    const [sphereVisibility, setSphereVisibilit] = useState(true)

    useEffect(() => {
        for(let i = 0; i < numSpheres; i++) {
            if (bpmSelected > getBpm(i))
                console.log("BPM maggiori")

        }


    })

    // USE EFFECT
    useEffect(() => {
        for (let i = 0; i < numSpheres; i++) {

            const [positionX, positionY, positionZ] = calculatePosition(i)
            const visibility = calculateVisibility(i, moodSelected, textureSelected, danceabilitySelected)
            const scale_for_visibility = visibility ? 1 : 0

            const matrix = new THREE.Matrix4();

            matrix.compose(
                new THREE.Vector3(positionX, positionY, positionZ),
                new THREE.Quaternion(),
                new THREE.Vector3(scale_for_visibility, scale_for_visibility, scale_for_visibility)
            )

            sphereGroupRef.current.setMatrixAt(i, matrix);
            sphereGroupRef.current.setColorAt(i, colors[i]);
            // console.log(`Sphere ${i}: Visibility: ${visibility}, BPM: ${bpm_sphere}, Mood: ${mood_sphere}, Danceability: ${danceability_sphere}, Texture: ${texture_sphere}`);

        }

        sphereGroupRef.current.instanceMatrix.needsUpdate = true
        sphereGroupRef.current.instanceColor.needsUpdate = true

    }, [numSpheres, selectedOptionX, selectedOptionY, selectedOptionZ])


    // Helper function to get the label content based on the selected option
    const getLabelContent = (option, i) => {
        switch (option) {
            case 'BPM':
                return `BPM: ${getBpm(i)}`;
            case 'Mood':
                return `Mood: ${getMood(i)}`;
            case 'Texture':
                return `Texture: ${getTexture(i)}`;
            case 'Danceability':
                return `Danceability: ${getDanceability(i)}`;
            default:
                return '';
        }
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


            return (

                // calculateVisibility(i, moodSelected, textureSelected, danceabilitySelected)
                true
                && (
                    <group key={i}>
                        <Html
                            position={positionLabels}
                            wrapperClass="label"
                            center
                            distanceFactor={16}
                            occlude={[sphereGroupRef, ...labelRef.current]}
                            ref={(ref) => (labelRef.current[i] = ref)}
                        >
                            Sphere {i}
                        </Html>

                        <Html
                            position={featureLabels}
                            wrapperClass="features"
                            center
                            distanceFactor={16}
                            occlude={[sphereGroupRef, ...labelRef.current]}
                            // onClick={() => handleLeftClick(i)}
                        >
                            {`${getLabelContent(selectedOptionX, i)}`} <br />
                            {`${getLabelContent(selectedOptionY, i)}`} <br />
                            {`${getLabelContent(selectedOptionZ, i)}`} <br />
                        </Html>
                    </group>
                )
            );






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
