import React, {createContext, useCallback, useMemo, useRef} from 'react';
import { useNumSpheres } from "./NumSpheresContext";
import {useLabels} from "./LabelsContext";

const SpherePropertiesContext = createContext();

export function SpherePropertiesProvider({ children }) {

    const numSpheres = useNumSpheres();
    const { MoodChoicesLabels } = useLabels();

    // Define your functions for calculating sphere properties
    const getBpm = useMemo(() => {
        const min = 20;
        const max = 200;
        return (i) => Math.floor(Math.random() * (max - min + 1) + min);
    }, []);

    const getMood = useMemo(() => {
        const moods = MoodChoicesLabels;
        return (i) => {
            const randomIndex = Math.floor(Math.random() * moods.length);
            return moods[randomIndex];
        };
    }, [MoodChoicesLabels]);

    const getDanceability = useMemo(() => {
        const min = 0;
        const max = 100;
        return (i) => Math.floor(Math.random() * (max - min + 1) + min);
    }, []);

    const getTexture = useMemo(() => {
        console.log("first render")

        const min = 1;
        const max = 10;
        return (i) => Math.floor(Math.random() * (max - min + 1) + min);
    }, []);



/*    // Create the sphereData array
    const sphereData = useMemo(() => {
        const data = [];
        for (let i = 0; i < numSpheres; i++) {
            data.push({
                bpm: getBpm(i),
                danceability: getDanceability(i),
                mood: getMood(i),
                texture: getTexture(i),
                // Add more properties as needed
            });
        }
        return data;
    }, [numSpheres, getBpm, getDanceability, getMood, getTexture]);*/



    // Render the children with the sphereData as a prop
    return (
        <SpherePropertiesContext.Provider
            value={{
                getBpm,
                getMood,
                getDanceability,
                getTexture

            }}
        >
            {children}
        </SpherePropertiesContext.Provider>
    );
}


export function useSpheresProperties(){
    return React.useContext(SpherePropertiesContext)
}