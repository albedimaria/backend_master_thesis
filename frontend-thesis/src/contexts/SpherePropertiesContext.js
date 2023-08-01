import React, {createContext, useCallback, useMemo, useRef} from 'react';
import { useNumSpheres } from "./NumSpheresContext";
import {useLabels} from "./LabelsContext";

const SpherePropertiesContext = createContext();

export function SpherePropertiesProvider({ children }) {

    const { MoodChoicesLabels, InstrumentalChoicesLabels, KeyChoicesLabels } = useLabels();

    // SLIDERS TYPE

    const getBpm = useMemo(() => {
        const min = 20;
        const max = 200;
        return (i) => Math.floor(Math.random() * (max - min + 1) + min);
    }, []);

    const getDanceability = useMemo(() => {
        const min = 0;
        const max = 100;
        return (i) => Math.floor(Math.random() * (max - min + 1) + min);
    }, []);

    const getTexture = useMemo(() => {
        // console.log("first render")

        const min = 1;
        const max = 10;
        return (i) => Math.floor(Math.random() * (max - min + 1) + min);
    }, []);




    // WINDOW TYPE

    const getMood = useMemo(() => {
        const moods = MoodChoicesLabels;
        return (i) => {
            // Generate a random index from 1 to moods.length - 1
            const randomIndex = Math.floor(Math.random() * (moods.length - 1)) + 1;
            return moods[randomIndex];
        };
    }, [MoodChoicesLabels]);

    const getKey = useMemo(() => {

        const key = KeyChoicesLabels
        return (i) => {
            const randomIndex = Math.floor(Math.random() * (key.length - 1)) + 1;
            return key[randomIndex];
        };
    }, [KeyChoicesLabels]);

    const getInstrumental = useMemo(() => {

        const instrumental = InstrumentalChoicesLabels;
        return (i) => {
            const randomIndex = Math.floor(Math.random() * (instrumental.length - 1)) + 1;
            return instrumental[randomIndex];
        };
    }, [InstrumentalChoicesLabels]);

    // const getIndex = useCallback((i) => i, []);
    const getIndex = useMemo(() => (i) => i, []);


/*    const getName = useMemo(() => {
        const getPropertyValue = (getProperty) => {
            const property = getProperty;
            return typeof property === 'string' ? property : '';
        };

        return (i, getIndex, getInstrumental, getKey) => {
            const output1 = getPropertyValue(getIndex(i).toString());
            const output2 = getPropertyValue(getInstrumental(i));
            const output3 = getPropertyValue(getKey(i));
            return `${output1} ${output2} ${output3}`.trim();
        };
    }, []);*/

    const getName = useMemo(() => {
        const getPropertyValue = (getProperty) => {
            const property = getProperty;
            return typeof property === 'string' ? property : '';
        };

        return (i, getIndex, getInstrumental, getKey) => {
            const output1 = getPropertyValue(getIndex(i).toString());
            const output2 = getPropertyValue(getInstrumental(i));
            const output3 = getPropertyValue(getKey(i));
            return [output1, ' - ', output2, ' - ', output3];
        };
    }, []);





    // Render the children with the sphereData as a prop
    return (
        <SpherePropertiesContext.Provider
            value={{
                getBpm,
                getMood,
                getDanceability,
                getTexture,
                getInstrumental,
                getKey,
                getIndex,
                getName
            }}
        >
            {children}
        </SpherePropertiesContext.Provider>
    );
}


export function useSpheresProperties(){
    return React.useContext(SpherePropertiesContext)
}