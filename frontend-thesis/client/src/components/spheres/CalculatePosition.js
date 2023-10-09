import { useCallback } from 'react';
import LabelsDataExtractor from "../../contexts/labelsContext/LabelDataExtractor";
import { useData } from "../../contexts/DataContext";
import { labelIndexFinder } from "../../contexts/labelsContext/LabelsIndexFinder";

function CalculatePosition({
                               selectedOptionX,
                               selectedOptionY,
                               selectedOptionZ,
                               sphereData
                           }) {

    const {data, explanation} = useData()
    const { moodClassesAvailable, instrumentClassesAvailable, keyClassesAvailable } =
        LabelsDataExtractor({ explanation });


    const calculatePosition = useCallback(
        (instanceId) => {
            const optionCalculations = {

                BPM: (i) => sphereData[i].bpm / 3 - 20 / 3,
                Texture: (i) => sphereData[i].texture * 5,
                Danceability: (i) => sphereData[i].danceability / 2.5,
                Mood: (i) => labelIndexFinder(moodClassesAvailable, sphereData[i].mood) / 4,
                Key: (i) => labelIndexFinder(keyClassesAvailable, sphereData[i].key),
                Instrument: (i) => labelIndexFinder(instrumentClassesAvailable, sphereData[i].instrument) / 4
            };

            // Apply selected position calculations based on options
            const positionX = optionCalculations[selectedOptionX]?.(instanceId) || 0;
            const positionY = optionCalculations[selectedOptionY]?.(instanceId) || 1;
            const positionZ = optionCalculations[selectedOptionZ]?.(instanceId) || 0;
            return [positionX, positionY, positionZ];
        },
        [selectedOptionX, selectedOptionY, selectedOptionZ, sphereData]
    );

    return calculatePosition;
}

export default CalculatePosition;
