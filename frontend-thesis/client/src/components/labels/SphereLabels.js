import React from 'react';
import { Html } from '@react-three/drei';


const SphereLabels = ({
                          visible,
                          numSpheres,
                          calculatePosition,
                          visibility,
                          sphereData,
                          sphereSize,
                          sphereGroupRef,
                          labelRef,
                          temp,
                          getNameToShow,
                          selectedOptionX,
                          selectedOptionY,
                          selectedOptionZ,
                          getLabelContent,
                          showSelected,
                      }) => {
    return visible
        ? Array.from({ length: numSpheres }, (_, instanceId) => {
            const positionOpt = calculatePosition(instanceId);

            const positionLabels = [
                positionOpt[0],
                positionOpt[1] + sphereSize * 1.4 + 0.6,
                positionOpt[2],
            ];
            const featureLabels = [
                positionOpt[0],
                positionOpt[1] - sphereSize * 0.8 - 0.6,
                positionOpt[2] + sphereSize * 1.4 + 0.3,
            ];

            return (
                visibility[instanceId] && (
                    <group key={instanceId}>
                        <Html
                            position={positionLabels}
                            wrapperClass="label"
                            center
                            distanceFactor={16}
                            occlude={[sphereGroupRef, ...labelRef.current]}
                            ref={(ref) => (labelRef.current[instanceId] = ref)}
                        >
                            {getNameToShow(sphereData[instanceId], showSelected)}
                        </Html>

                        {temp && (
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
                        )}
                    </group>
                )
            );
        })
        : null;
};

export default SphereLabels;
