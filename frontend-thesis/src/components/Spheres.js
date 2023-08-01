import * as THREE from 'three';
import { Debug, InstancedRigidBodies, Physics, RapierRigidBody, RigidBody} from "@react-three/rapier";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import { Html } from "@react-three/drei";
import { button, folder, useControls} from "leva";
import { useNumSpheres } from "../contexts/NumSpheresContext";
import { useOptions } from "../contexts/OptionsContext";
import { useSliders } from "../contexts/SlidersContext";
import {useLabels} from "../contexts/LabelsContext";
import { useSpheresProperties } from "../contexts/SpherePropertiesContext";

function SpheresStart() {

    const {
        numSpheres, setNumSpheres,
        sphereSegments, setSphereSegments,
        sphereSize, setSphereSize,
        increaseSize, decreaseSize,
        incrementNumSpheres, decrementNumSpheres,
        increaseResolution, decreaseResolution
    } = useNumSpheres();

    const [visible, setVisible] = useState(true)

    const sphereGroupRef = useRef([])

    const labelRef = useRef([]);

    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(sphereSize, sphereSegments, sphereSegments), [sphereSize, sphereSegments]);

    // SPHERES CONTROLS


    // POSITION
    const {
        selectedOptionX, selectedOptionY, selectedOptionZ} = useOptions()

    const getSphereSize = () => {
        return sphereSize;
    };

    // ARRAYS OF PROPS
    const { getBpm, getTexture, getDanceability, getMood, getInstrumental, getKey, getIndex, getName } = useSpheresProperties()

    const sphereData = useMemo(
        () =>
            Array.from({ length: numSpheres }, (_, i) => ({
                bpm: getBpm(i),
                danceability: getDanceability(i),
                mood: getMood(i),
                texture: getTexture(i),
                instrumental: getInstrumental(i),
                key: getKey(i),
                index: getIndex(i),
                name: getName(i, getIndex, getInstrumental, getKey)
            })),

        [numSpheres, getBpm, getDanceability, getMood, getTexture, getInstrumental, getKey, getIndex, getName]
    );

    //console.log(sphereData)


    // COLORS
    const colors = useMemo(() => {
        const colorsArray = [];
        for (let i = 0; i < numSpheres; i++) {
            const color = new THREE.Color().setHSL(i / numSpheres, 1, 0.5);
            colorsArray.push(color);
        }
        return colorsArray;

    }, [numSpheres]);


    const calculatePosition = useCallback(
        (i) => {
            const optionCalculations = {
                BPM: (i) => (sphereData[i].bpm / 5),
                Texture: (i) => (sphereData[i].texture * 5),
                Danceability: (i) => (sphereData[i].danceability / 5),
                Mood: (i) => colors[i].r * 10 + 2,
                Key: (i) => i / 2,
                Instrumental: (i) => i / 4,
                // Name: (i) => (sphereData[i].name)
            };

            const positionX = optionCalculations[selectedOptionX]?.(i) || 0;
            const positionY = optionCalculations[selectedOptionY]?.(i) || 1;
            const positionZ = optionCalculations[selectedOptionZ]?.(i) || 0;
            return [positionX, positionY, positionZ];
        },
        [selectedOptionX, selectedOptionY, selectedOptionZ, sphereData, colors]

    );



    const [temp, setTemp] = useState(false);
    const longLeftClick = (event) => {
        console.log('long left click occurred')
        setTemp((prevTemp) => (!prevTemp))
    }



    // FILTERS
    const {
        bpmSelectedLow,
        bpmSelectedHigh,
        textureSelectedLow,
        textureSelectedHigh,
        textSelected,
        danceabilitySelectedLow,
        danceabilitySelectedHigh,
        keySelected,
        instrumentSelected,
        moodSelected,
        showSelected, setShowSelected
    } = useSliders()




    // VISIBILITY
    const calculateVisibility = useCallback(
        (sphereProperties, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh,
         danceabilitySelectedLow, danceabilitySelectedHigh, moodSelected, instrumentalSelected, keySelected
        ) => {
            const { bpm, texture, danceability, mood, instrumental, key, name } = sphereProperties;

            // Add your desired logic here based on the slider values and sphere properties
            if (
                bpmSelectedLow <= bpm && bpm <= bpmSelectedHigh &&
                textureSelectedLow <= texture && texture <= textureSelectedHigh &&
                danceabilitySelectedLow <= danceability && danceability <= danceabilitySelectedHigh &&
                (mood === moodSelected || moodSelected === 'all moods')
                // &&                 (instrumental === instrumentalSelected || instrumentalSelected === 'all instrs')
                // &&                 (key === keySelected)
            ) {
                return true;
            } else {
                return false
            }
        },
        []
    );


/*    const calculateVisibility = useCallback(
        (sphereProperties, bpmSelectedLow, bpmSelectedHigh, moodSelected) => {
            const { bpm, texture, danceability, mood } = sphereProperties;

            // Add your desired logic here based on the slider values and sphere properties
            if (moodSelected === 'purple') {
                console.log(moodSelected);
                return true;
            } else {
                console.log(moodSelected);
                return false;
            }
        },
        [bpmSelectedLow, bpmSelectedHigh, moodSelected]
    );

    console.log(moodSelected)*/









    const visibility = useMemo(() => {
        return sphereData.map((sphereProperties) => {
            return calculateVisibility(
                sphereProperties,
                bpmSelectedLow,
                bpmSelectedHigh,
                textureSelectedLow,
                textureSelectedHigh,
                danceabilitySelectedLow,
                danceabilitySelectedHigh,
                moodSelected,
                keySelected,
                instrumentSelected
            );
        });
    }, [sphereData, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh, danceabilitySelectedLow, danceabilitySelectedHigh,
        moodSelected, instrumentSelected, keySelected]);


    // OVERLAPPING
    const isOverlapping = (i) => {
        const [positionX1, positionY1, positionZ1] = calculatePosition(i);

        for (let j = 0; j < numSpheres; j++) {
            if (i !== j) {
                const [positionX2, positionY2, positionZ2] = calculatePosition(j);
                const distance = Math.sqrt(
                    Math.pow(positionX2 - positionX1, 2) +
                    Math.pow(positionY2 - positionY1, 2) +
                    Math.pow(positionZ2 - positionZ1, 2)
                );

                if (distance < sphereSize) {
                    return true; // Spheres are overlapping
                }
            }
        }

        return false; // Spheres are not overlapping
    };

    // useEffect for checking overlapping spheres
    useEffect(() => {
        // Check for overlapping spheres
        const checkOverlap = () => {
            for (let i = 0; i < numSpheres; i++) {
                if (isOverlapping(i)) {
                    // console.log(`Sphere ${i} is overlapping`);
                    decreaseSize()
                }
               /* else
                    console.log(`no overlapping`)*/
            }
        };

        checkOverlap()
    }, [numSpheres, selectedOptionX, selectedOptionY, selectedOptionZ]);


// MAIN USE EFFECT
    useEffect(() => {
        for (let i = 0; i < numSpheres; i++) {
            const [positionX, positionY, positionZ] = calculatePosition(i);
            const sphereVisibility = visibility[i];
            const scale_for_visibility = sphereVisibility ? 1 : 0;

            const matrix = new THREE.Matrix4();

            matrix.compose(
                new THREE.Vector3(positionX, positionY, positionZ),
                new THREE.Quaternion(),
                new THREE.Vector3(scale_for_visibility, scale_for_visibility, scale_for_visibility)
            );

            sphereGroupRef.current.setMatrixAt(i, matrix);
            sphereGroupRef.current.setColorAt(i, colors[i]);
        }

        sphereGroupRef.current.instanceMatrix.needsUpdate = true;
        sphereGroupRef.current.instanceColor.needsUpdate = true;

        // console.log("Re-rendering of main useEffect");
    }, [numSpheres, selectedOptionX, selectedOptionY, selectedOptionZ, visibility, sphereData]);


    // NAME OF THE SPHERES
    const getNameToShow = (sphere, showSelected) => {
        return showSelected ? "real name" : sphere.name;
    };


    const getLabelContent = useCallback(
        (option, i) => {
            switch (option) {
                case 'BPM':
                    return `BPM: ${sphereData[i].bpm}`;
                case 'Mood':
                    return `Mood: ${sphereData[i].mood}`;
                case 'Texture':
                    return `Texture: ${sphereData[i].texture}`;
                case 'Danceability':
                    return `Danceability: ${sphereData[i].danceability}`;
                case 'Instrumental':
                    return `Instr: ${sphereData[i].instrumental}`;
                case 'Key':
                    return `Key: ${sphereData[i].key}`;
                default:
                    return '';
            }
        },
        [sphereData]
    );

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
                visibility[i]
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
{/*
                            Sphere {i} {textSelected}
*/}
                            {getNameToShow(sphereData[i], showSelected)}

                        </Html>

                        {temp && ( <Html
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
                        </Html>)}

                    </group>
                )
            );






        })
        : null;





    return <>

        <group visible={visible}>


            <instancedMesh
                onClick={ longLeftClick }
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
