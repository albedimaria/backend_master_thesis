import * as THREE from 'three';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import { useNumSpheres } from "../../contexts/NumSpheresContext";
import { useOptions } from "../../contexts/OptionsContext";
import { useSliders } from "../../contexts/SlidersContext";
import { useSpheresProperties } from "../../contexts/SpherePropertiesContext";
// import dashboard from "./inProgress/Dashboard";
import { getLabelContent } from "../labels/LabelComponent";
import SphereLabels from '../labels/SphereLabels';
import SphereDataGenerator from "./SphereDataGenerator";
import CalculatePosition from "./CalculatePosition";
import {clickHandle, rightClickHandle} from "../MouseEvents";



function SpheresStart() {

    // dashboard()

    const {numSpheres, sphereSegments, sphereSize} = useNumSpheres();         // SPHERES BASIC CONTROLS
    const {selectedOptionX, selectedOptionY, selectedOptionZ} = useOptions()    // AXIS CHOICE


    const [visible, setVisible] = useState(true)
    const meshRef = useRef([])
    const labelRef = useRef([]);
    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(sphereSize, sphereSegments, sphereSegments), [sphereSize, sphereSegments]);

    // ARRAYS OF FUNCTIONS
    const {
        getBpm,
        getTexture,
        getDanceability,
        getMood,
        getInstrument,
        getKey,
        getIndex,
        getName
    } = useSpheresProperties()

    // ARRAY OF PROPS
    const sphereData = SphereDataGenerator({
        numSpheres,
        getBpm,
        getDanceability,
        getMood,
        getTexture,
        getInstrument,
        getKey,
        getIndex,
        getName,
    });

    // COLORS
    const colors = useMemo(() => {
        return Array.from({length: numSpheres}, (_, instanceId) => {
            const color = new THREE.Color().setHSL(instanceId / numSpheres, 1, 0.5);
            return color;
        });
    }, [numSpheres]);


    // POSITION OF EACH SPHERE
    const calculatePosition = CalculatePosition({
        selectedOptionX,
        selectedOptionY,
        selectedOptionZ,
        sphereData,
        colors,
    });


    // FILTERS
    const {
        bpmSelectedLow,
        bpmSelectedHigh,
        textureSelectedLow,
        textureSelectedHigh,
        danceabilitySelectedLow,
        danceabilitySelectedHigh,
        moodSelected,
        keySelected,
        instrumentSelected,
        textSelected,
        showSelected,
    } = useSliders()

    // VISIBILITY FUNCTION
    const calculateVisibility = useCallback(
        (sphereProperties, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh,
         danceabilitySelectedLow, danceabilitySelectedHigh, moodSelected, keySelected, instrumentSelected, textSelected
        ) => {
            const {bpm, texture, danceability, mood, instrument, key, name} = sphereProperties;


            if (textSelected) {
                // If textSelected is not empty, apply filtering based on textSelected
                if (
                    name[0].includes(textSelected) ||
                    name[2].includes(textSelected) ||
                    name[4].includes(textSelected)
                ) {
                    return true; // Sphere matches the name filter
                } else {
                    return false; // Sphere does not match the name filter
                }

            } else {
                // If textSelected is empty, apply other filters
                if (
                    bpmSelectedLow <= bpm && bpm <= bpmSelectedHigh &&
                    textureSelectedLow <= texture && texture <= textureSelectedHigh &&
                    danceabilitySelectedLow <= danceability && danceability <= danceabilitySelectedHigh &&
                    (mood === moodSelected || moodSelected === 'all moods') &&
                    (instrument === instrumentSelected || instrumentSelected === 'all instrs') &&
                    (key === keySelected || keySelected === 'all keys')
                ) {
                    return true; // Sphere matches other filters
                } else {
                    return false; // Sphere does not match other filters
                }
            }
        },
        [textSelected] // Make sure to include textSelected in the dependency array
    );


    // VISIBILITY FOR EACH SPHERE
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
                instrumentSelected,
                textSelected
            );
        });
    }, [sphereData, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh, danceabilitySelectedLow, danceabilitySelectedHigh,
        moodSelected, instrumentSelected, keySelected, textSelected]);


    // MOUSE EVENTS
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleClick = (index) => {
        setSelectedItemIndex(index);
    };

    const [temp, setTemp] = useState(false);
    const longLeftClick = (event) => {
        console.log('long left click occurred')
        setTemp((prevTemp) => (!prevTemp))
    }

    // NAME OF THE SPHERES
    const getNameToShow = (sphere, showSelected) => {
        return showSelected ? "real name" : sphere.name;
    };


    // SPHERES RENDERING
    useEffect(() => {
        for (let instanceId = 0; instanceId < numSpheres; instanceId++) {
            const [positionX, positionY, positionZ] = calculatePosition(instanceId);
            const sphereVisibility = visibility[instanceId];
            const scale_for_visibility = sphereVisibility ? 1 : 0;
            const isClicked = getSelection(instanceId)

            const matrix = new THREE.Matrix4();

            matrix.compose(
                new THREE.Vector3(positionX, positionY, positionZ),
                new THREE.Quaternion(),
                new THREE.Vector3(scale_for_visibility, scale_for_visibility, scale_for_visibility)
            );

            meshRef.current.setMatrixAt(instanceId, matrix);
            meshRef.current.setColorAt(instanceId, colors[instanceId]);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.instanceColor.needsUpdate = true;

        // console.log("Re-rendering of main useEffect");
    }, [numSpheres, selectedOptionX, selectedOptionY, selectedOptionZ, visibility, sphereData]);


    const labelsHtml = (
        <SphereLabels
            visible={visible}
            numSpheres={numSpheres}
            calculatePosition={calculatePosition}
            visibility={visibility}
            sphereData={sphereData}
            sphereSize={sphereSize}
            sphereGroupRef={meshRef}
            labelRef={labelRef}
            temp={temp}
            getNameToShow={getNameToShow}
            selectedOptionX={selectedOptionX}
            selectedOptionY={selectedOptionY}
            selectedOptionZ={selectedOptionZ}
            getLabelContent={getLabelContent}
            showSelected={showSelected}
        />
    );



    return (
        <>
            <instancedMesh
                ref={ meshRef }
                args={[ null, null, numSpheres ]}
                geometry={ sphereGeometry }
                onClick={ clickHandle }
            >
                <meshStandardMaterial/>
                {labelsHtml}

            </instancedMesh>
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


