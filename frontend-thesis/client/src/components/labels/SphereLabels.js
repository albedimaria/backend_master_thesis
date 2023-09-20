import React from 'react';
import { Html } from '@react-three/drei';
import { useVisibility } from "../../utils/VisibilityFunction";
import getNameToShow from "../../contexts/labelsContext/ChangingNameFunction";
import SphereDataGenerator from "../spheres/SphereDataGenerator";
import { getLabelContent } from "./LabelComponent";

const SphereLabels = ({
                          visible,
                          calculatePosition,
                          sphereSize,
                          meshRef,
                          labelRef,
                          selectedOptionX,
                          selectedOptionY,
                          selectedOptionZ,
                          showSelected,
                      }) => {

    const visibility = useVisibility(); // Use the visibility hook
    const sphereData = SphereDataGenerator();

    return visible
        ? Array.from({ length: sphereData.length }, (_, instanceId) => {
            const positionOpt = calculatePosition(instanceId);

            const positionLabels = [
                positionOpt[0],
                positionOpt[1] + sphereSize * 1.4 + 0.6,
                positionOpt[2],
            ];

            const featureContent = (
                <>
                    {getLabelContent(selectedOptionX, sphereData[instanceId])} <br />
                    {getLabelContent(selectedOptionY, sphereData[instanceId])} <br />
                    {getLabelContent(selectedOptionZ, sphereData[instanceId])} <br />
                </>
            );

            console.log('featCont', featureContent)

            return (
                visibility(sphereData[instanceId], { showSelected }) && ( // Check visibility using the hook
                    <group key={instanceId}>
                        <Html
                            position={positionLabels}
                            wrapperClass="label"
                            center
                            distanceFactor={16}
                            occlude={[meshRef, ...labelRef.current]}
                            ref={(ref) => (labelRef.current[instanceId] = ref)}
                        >
                            {getNameToShow(sphereData[instanceId], "real name", showSelected)}
                            {getLabelContent(selectedOptionX, sphereData[instanceId])} <br />

                        </Html>
                    </group>
                )
            );
        })
        : null;
};

export default SphereLabels;


/*       const featureLabels = [
                positionOpt[0],
                positionOpt[1] - sphereSize * 0.8 - 0.6,
                positionOpt[2] + sphereSize * 1.4 + 0.3,
            ];*/

{/*         {temp && (
                            <Html
                                position={featureLabels}
                                wrapperClass="features"
                                center
                                distanceFactor={16}
                                occlude={[sphereGroupRef, ...labelRef.current]}
                            >
                                {`${getLabelContent(selectedOptionX, sphereData[instanceId])}`} <br />
                                {`${getLabelContent(selectedOptionY, sphereData[instanceId])}`} <br />
                                {`${getLabelContent(selectedOptionZ, sphereData[instanceId])}`} <br />
                            </Html>
                        )}*/}
