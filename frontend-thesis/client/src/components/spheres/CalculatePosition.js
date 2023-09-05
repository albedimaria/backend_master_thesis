// CalculatePosition.js
import { useCallback } from 'react';

function CalculatePosition({
                               selectedOptionX,
                               selectedOptionY,
                               selectedOptionZ,
                               sphereData,
                               colors,
                           }) {
    const calculatePosition = useCallback(
        (instanceId) => {
            const optionCalculations = {
                BPM: (i) => sphereData[i].bpm / 5,
                Texture: (i) => sphereData[i].texture * 5,
                Danceability: (i) => sphereData[i].danceability / 5,
                Mood: (i) => colors[i].r * 10 + 2,
                Key: (i) => i / 2,
                Instrument: (i) => i / 4,
            };

            // Apply selected position calculations based on options
            const positionX = optionCalculations[selectedOptionX]?.(instanceId) || 0;
            const positionY = optionCalculations[selectedOptionY]?.(instanceId) || 1;
            const positionZ = optionCalculations[selectedOptionZ]?.(instanceId) || 0;
            return [positionX, positionY, positionZ];
        },
        [selectedOptionX, selectedOptionY, selectedOptionZ, sphereData, colors]
    );

    return calculatePosition;
}

export default CalculatePosition;
