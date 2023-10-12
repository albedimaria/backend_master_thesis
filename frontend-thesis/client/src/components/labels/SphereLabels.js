import React, {useState} from 'react';
import { Html } from '@react-three/drei';
import { useVisibility } from "../../utils/VisibilityFunction";
import getNameToShow from "../../contexts/labelsContext/ChangingNameFunction";
import SphereDataGenerator from "../spheres/SphereDataGenerator";
import { getLabelContent } from "./LabelsFromAxisFunction";

const SphereLabels = ({
                          meshRef,
                          labelRef,
                          selectedOptionX,
                          selectedOptionY,
                          selectedOptionZ,
                          showSelected,
                          labelVisibility,
                      }) => {

    const sphereData = SphereDataGenerator();
    /* const multiplying = 1.4
     const additional = 0.6*/

    return labelVisibility
        ? Array.from({ length: sphereData.length }, (_, instanceId) => {

            /*     const positionOpt = calculatePosition(instanceId);

            const positionLabels = [
                positionOpt[0],
                positionOpt[1] + sphereSize * multiplying + additional,
                positionOpt[2],
            ];*/

            const positionLabels = [30, 25, 0]
            const featureContent = (
                <>
                    {getLabelContent(selectedOptionX, sphereData[instanceId])} <br />
                    {getLabelContent(selectedOptionY, sphereData[instanceId])} <br />
                    {getLabelContent(selectedOptionZ, sphereData[instanceId])} <br />
                </>
            );


            return (
                    labelVisibility[instanceId] && ( // Check visibility using the hook

                    <group key={instanceId}>
                        <Html
                            position={positionLabels}
                            wrapperClass="label"
                            center
                            distanceFactor={30}
                            occlude={[meshRef, ...labelRef.current]}
                            ref={(ref) => (labelRef.current[instanceId] = ref)}
                        >
                            {getNameToShow(sphereData[instanceId], featureContent, showSelected)}

                        </Html>
                    </group>
                )
            );
        })
        : null;
};


export default SphereLabels;