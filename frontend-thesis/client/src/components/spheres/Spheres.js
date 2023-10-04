import * as THREE from 'three';
import { useEffect, useMemo, useRef } from "react";
import React from "react";
import { useNumSpheres } from "../../contexts/basicSphereProperties/numSpheresContext/NumSpheresContext";
import { useOptions } from "../../contexts/levaControls/axisControls/OptionsContext";
import { useSliders } from "../../contexts/levaControls/filtersControls/SlidersContext";
import SphereLabels from '../labels/SphereLabels';
import SphereDataGenerator from "./SphereDataGenerator";
import CalculatePosition from "./CalculatePosition";
import { useVisibility } from "../../utils/VisibilityFunction";
import LabelsState from "../../contexts/labelsContext/LabelsState";


/*try {
    importScripts('https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.web.js',
        'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-*.js')
}   catch (e) {
    console.error(e.message);
}*/


function SpheresStart() {

    const { numSpheres, sphereSize, sphereSegments } = useNumSpheres();         // SPHERES BASIC CONTROLS
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

/*    function hashCode(str) { // java String#hashCode
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    function intToRGB(i){
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }*/

    /*  COLORS
   const colors = [];

   sphereData.forEach((sphere) => {
       const color = sphere.color;
       colors.push(color);
   });

   console.log(colors);

   */

    // COLORS
    const colors = useMemo(() => {
        return Array.from({length: numSpheres}, (_, instanceId) => {
            const color = new THREE.Color().setHSL(instanceId / numSpheres, 1, 0.5);
            return color;
        });
    }, [numSpheres]);


/*    const onPointerOver = (e) => {
        e.stopPropagation();
        setLabelVisibility((prevLabelVisibility) => {
            prevLabelVisibility[e.instanceId] = !prevLabelVisibility[e.instanceId];
            // console.log(`Label visibility for Instance ID ${e.instanceId} toggled to ${prevLabelVisibility[e.instanceId]}`);
            return [...prevLabelVisibility];
        });
        // console.log("Instance ID:", e.instanceId);
    }*/

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
            const scale_for_visibility = isVisible ? 1 : 0;

            matrix.compose(
                new THREE.Vector3(positionX, positionY, positionZ),
                new THREE.Quaternion(),
                new THREE.Vector3(scale_for_visibility, scale_for_visibility, scale_for_visibility)
            );

            meshRef.current.setMatrixAt(instanceId, matrix);
            meshRef.current.setColorAt(instanceId, colors[instanceId]);

            // console.log(sphereData[instanceId].color)
        }
        meshRef.current.instanceMatrix.needsUpdate = true;


        // Update instanceMatrix and instanceColor as needed
    }, [numSpheres, selectedOptionX, selectedOptionY, selectedOptionZ, sphereData, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh, danceabilitySelectedLow, danceabilitySelectedHigh, moodSelected, keySelected, instrumentSelected, textSelected]);




    const clickHandle = (e) => {
        e.stopPropagation();
        setLabelVisibility((prevLabelVisibility) => {
            prevLabelVisibility[e.instanceId] = !prevLabelVisibility[e.instanceId];
            // console.log(`Label visibility for Instance ID ${e.instanceId} toggled to ${prevLabelVisibility[e.instanceId]}`);
            return [...prevLabelVisibility];
        });
        // console.log("Instance ID:", e.instanceId);
    }


/*    let esPkg = require('essentia.js');

    const essentia = new esPkg.Essentia(esPkg.EssentiaWASM);

    // prints version of the essentia wasm backend
    console.log(essentia.version)

    // prints all the available algorithm methods in Essentia
    console.log(essentia.algorithmNames)*/

    return (
        <>
            <instancedMesh
                ref={ meshRef }
                args={[ null, null, numSpheres ]}
                geometry={ sphereGeometry }
                onClick={ clickHandle }
                // onPointerOver={ onPointerOver }
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







