import React, {createContext} from 'react';
import { useNumSpheres } from "./NumSpheresContext";

const SpherePropertiesContext = createContext()
export const SpherePropertiesProvider = ({ children }) => {

    const numSpheres = useNumSpheres()

    // Define your functions for calculating sphere properties
    const getBpm = (i) => {

        const min = 20;
        const max = 200;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getMood = (i) => {
        const moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Excited'];
        const randomIndex = Math.floor(Math.random() * moods.length);
        return moods[randomIndex];
    };


    const getDanceability = (i) => {

        const min = 0;
        const max = 100;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getTexture = (i) => {

        const min = 1;
        const max = 10;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Create the sphereData array
    const sphereData = React.useMemo(
        () =>
            Array.from({ length: numSpheres }, (_, i) => ({
                bpm: getBpm(i),
                danceability: getDanceability(i),
                mood: getMood(i),
                texture: getTexture(i)
                // Add more properties as needed
            })),
        [numSpheres]
    );

    // Render the children with the sphereData as a prop
 return (
     <SpherePropertiesContext.Provider value={{
        getBpm,
        getMood,
        getDanceability,
        getTexture,
         sphereData
     }} >
         { children }
     </SpherePropertiesContext.Provider>
 )
};

export function useSpheresProperties(){
    return React.useContext(SpherePropertiesContext)
}