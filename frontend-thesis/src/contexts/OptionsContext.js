import React, {createContext, useEffect, useState} from 'react';
import { button, folder, useControls } from 'leva';
import { useLabels } from './LabelsContext';

const OptionsContext = createContext();
export const OptionsProvider = ({ children }) => {
    const [selectedOptionX, setSelectedOptionX] = useState('BPM');
    const [selectedOptionY, setSelectedOptionY] = useState('Texture');
    const [selectedOptionZ, setSelectedOptionZ] = useState('Mood');

    const { BPM, Texture, Mood, Danceability, MoodChoices, OptionsLabels } = useLabels();

    const [, set] = useControls('axis controls', () => ({
        xAxis: {
            options: OptionsLabels,
            value: selectedOptionX,
            onChange: (value) => setSelectedOptionX(value),
            label: 'X Axis',
        },
        yAxis: {
            options: OptionsLabels,
            value: selectedOptionY,
            onChange: (value) => setSelectedOptionY(value),
            label: 'Y Axis',
        },
        zAxis: {
            options: OptionsLabels,
            value: selectedOptionZ,
            onChange: (value) => setSelectedOptionZ(value),
            label: 'Z Axis',
        },
    }));


    return (
        <OptionsContext.Provider
            value={{
                selectedOptionX,
                // setSelectedOptionX,
                selectedOptionY,
                // setSelectedOptionY,
                selectedOptionZ,
                // setSelectedOptionZ,
            }}
        >
            {children}
        </OptionsContext.Provider>
    );
};

export function useOptions() {
    return React.useContext(OptionsContext)
}
