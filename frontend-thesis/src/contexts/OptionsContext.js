import React, {createContext, useEffect, useState} from 'react';
import { button, folder, useControls } from 'leva';
import { useLabels } from './LabelsContext';

const OptionsContext = createContext();
export const OptionsProvider = ({ children }) => {
    const [selectedOptionX, setSelectedOptionX] = useState('BPM');
    const [selectedOptionY, setSelectedOptionY] = useState('Mood');
    const [selectedOptionZ, setSelectedOptionZ] = useState('Instrumental');

    const { OptionsLabels } = useLabels();


    const [, set] = useControls('axis controls', () => {

        const optionsX = OptionsLabels.slice(0, 2);
        const optionsY = OptionsLabels.slice(2, 4);
        const optionsZ = OptionsLabels.slice(4);

        return {
            xAxis: {
                options: optionsX,
                value: selectedOptionX,
                onChange: (value) => setSelectedOptionX(value),
                label: 'X Axis',
            },
            yAxis: {
                options: optionsY,
                value: selectedOptionY,
                onChange: (value) => setSelectedOptionY(value),
                label: 'Y Axis',
            },
            zAxis: {
                options: optionsZ,
                value: selectedOptionZ,
                onChange: (value) => setSelectedOptionZ(value),
                label: 'Z Axis',
            },


        };
    });



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
