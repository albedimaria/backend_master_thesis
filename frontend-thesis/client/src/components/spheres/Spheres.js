import * as THREE from 'three';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import { useNumSpheres } from "../../contexts/basicSphereProperties/numSpheresContext/NumSpheresContext";
import { useOptions } from "../../contexts/levaControls/axisControls/OptionsContext";
import { useSliders } from "../../contexts/levaControls/filtersControls/SlidersContext";
import SphereLabels from '../labels/SphereLabels';
import SphereDataGenerator from "./SphereDataGenerator";
import CalculatePosition from "./CalculatePosition";
import { useVisibility } from "../../utils/VisibilityFunction";
import LabelsState from "../../contexts/labelsContext/LabelsState";
import { useColorsDropbox } from "../../contexts/levaControls/colorDropbox/LevaColorDropboxContext";
import AudioPlayer from "../../contexts/audioContext";

function SpheresStart() {

    const { numSpheres, sphereSize, setSphereSize, sphereSegments, setSphereSegments } = useNumSpheres();         // SPHERES BASIC CONTROLS
    const { selectedOptionX, selectedOptionY, selectedOptionZ} = useOptions()    // AXIS CHOICE

    // ARRAY OF PROPS
    const sphereData = SphereDataGenerator();

    const meshRef = useRef([])
    const labelRef = useRef([]);
    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(sphereSize, sphereSegments, sphereSegments), [sphereSize, sphereSegments]);
    const { labelVisibility, setLabelVisibility } = LabelsState()

    // POSITION OF EACH SPHERE
    const calculatePosition = CalculatePosition({
        selectedOptionX,
        selectedOptionY,
        selectedOptionZ,
        sphereData
    });

    // PARAMS OF FILTERS
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
        showSelected
    } = useSliders()


    const visibility = useVisibility();

    const { colors, selectedFeature } = useColorsDropbox()

    const [scaleFactor, setScaleFactor] = useState(new Array(numSpheres).fill(1));


    // SPHERES RENDERING
    useEffect(() => {
        for (let instanceId = 0; instanceId < numSpheres; instanceId++) {
            const sphere = sphereData[instanceId];

            const isVisible = visibility(sphere, {
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
            });

            // Use the labelVisibility state to determine visibility
            const isSphereVisible = isVisible;

            // Update labelVisibility based on isVisible only if it's false
            if (!isSphereVisible) {
                setLabelVisibility((prevLabelVisibility) => {
                    prevLabelVisibility[instanceId] = isSphereVisible;
                    return [...prevLabelVisibility];
                });
            }

            const [positionX, positionY, positionZ] = calculatePosition(instanceId);
            const matrix = new THREE.Matrix4();
            const scale_for_visibility = isVisible ? scaleFactor[instanceId] : 0;

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



        // Update instanceMatrix and instanceColor as needed
    }, [numSpheres, scaleFactor, selectedOptionX, selectedOptionY, selectedOptionZ, sphereData, selectedFeature,
        bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh, danceabilitySelectedLow, danceabilitySelectedHigh, moodSelected, keySelected, instrumentSelected, textSelected]);



    // MOUSE EVENTS: CURSOR

    // pointer inside/outside the sphere
    const onPointerOver = (e) => {
        const { instanceId } = e;
        const updatedScaleFactors = [...scaleFactor];
        updatedScaleFactors[instanceId] = 1.5; // Increase scale for the hovered sphere
        setScaleFactor(updatedScaleFactors);

        setLabelVisibility((prevLabelVisibility) => {
            prevLabelVisibility[e.instanceId] = !prevLabelVisibility[e.instanceId];
            // console.log(`Label visibility for Instance ID ${e.instanceId} toggled to ${prevLabelVisibility[e.instanceId]}`);
            return [...prevLabelVisibility];
        });
    }

    const onPointerOut = (e) => {
        setScaleFactor(new Array(numSpheres).fill(1)); // Reset scale for all spheres when not hovered
        setLabelVisibility((prevLabelVisibility) => {
            prevLabelVisibility[e.instanceId] = !prevLabelVisibility[e.instanceId];
            // console.log(`Label visibility for Instance ID ${e.instanceId} toggled to ${prevLabelVisibility[e.instanceId]}`);
            return [...prevLabelVisibility];
        });
    }


    // MOUSE EVENTS: CLICKS

    // right click
    const righClickHandle = (e) => {
        e.preventDefault(); // Prevent the default right-click context menu
        console.log("Instance ID:", e.instanceId);

    }

    // const { audioRef, handleContextMenu } = AudioPlayer('./rnb house - 124.mp3');




    return (
        <>
            <instancedMesh
                ref={ meshRef }
                args={[ null, null, numSpheres ]}
                geometry={ sphereGeometry }
                onContextMenu={ righClickHandle }
                onPointerOver={ onPointerOver }
                onPointerOut = { onPointerOut }
            >
                <meshStandardMaterial/>
                <SphereLabels
                    meshRef={meshRef}
                    labelRef={labelRef}
                    selectedOptionX={selectedOptionX}
                    selectedOptionY={selectedOptionY}
                    selectedOptionZ={selectedOptionZ}
                    showSelected={showSelected}
                    labelVisibility={labelVisibility}
                />

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







