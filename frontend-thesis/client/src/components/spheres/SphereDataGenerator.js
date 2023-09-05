// SphereDataGenerator.js
import { useMemo } from 'react';

function SphereDataGenerator({
                                 numSpheres,
                                 getBpm,
                                 getDanceability,
                                 getMood,
                                 getTexture,
                                 getInstrument,
                                 getKey,
                                 getIndex,
                                 getName,
                             }) {
    const sphereData = useMemo(
        () =>
            Array.from({ length: numSpheres }, (_, instanceId) => ({
                bpm: getBpm(instanceId),
                danceability: getDanceability(instanceId),
                mood: getMood(instanceId),
                texture: getTexture(instanceId),
                instrument: getInstrument(instanceId),
                key: getKey(instanceId),
                index: getIndex(instanceId),
                name: getName(instanceId, getIndex, getInstrument, getKey),
                // selected: getSelection(i, isSelected)
            })),
        [numSpheres, getBpm, getDanceability, getMood, getTexture, getInstrument, getKey, getIndex, getName]
    );

    return sphereData;
}

export default SphereDataGenerator;
