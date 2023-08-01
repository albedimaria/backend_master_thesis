import React, { createContext, useState } from 'react'
import {button, folder, useControls} from "leva";

// Create the context
const NumSpheresContext = createContext();

// Create a provider component
export function NumSpheresProvider({ children }) {

    const [numSpheres, setNumSpheres] = useState(20);
    const [sphereSegments, setSphereSegments] = useState(8);
    const [sphereSize, setSphereSize] = useState(0.3)
    const [buttonVisibility, setButtonVisibility] = useState(false)

    const increaseResolution = () => {
        setSphereSegments((prevSphereSegments) => prevSphereSegments * 2);
    }

    const decreaseResolution = () => {
        setSphereSegments((prevSphereSegments) => prevSphereSegments / 2);
    }

    const increaseSize = () => {
        setSphereSize((prevSphereSize) => prevSphereSize * 2);
    }

    const decreaseSize = () => {
        setSphereSize((prevSphereSize) => Math.max(prevSphereSize / 2, 0.1));
    }


    const incrementNumSpheres = () => {
        setNumSpheres((prevNumSpheres) => prevNumSpheres + 1)
    };

    const decrementNumSpheres = () => {
        setNumSpheres((prevNumSpheres) => (prevNumSpheres === 1 ? 1 : prevNumSpheres - 1));
    };


    const [sphereSizeControl, set] = useControls('spheres', () => ({

        sphereSizeControl: folder(
            {
                decreaseSize: button(() => {
                    decreaseSize();
                }),
                increaseSize: button(() => {
                    increaseSize();
                }),
            },
        ),

        buttons: folder(
            {
                lowerResolution: button(() => {
                    decreaseResolution()
                }),
                higherResolution: button(() => {
                    increaseResolution();
                }),
                addSphere: button(() => {
                    incrementNumSpheres();
                }),
                removeSphere: button(() => {
                    decrementNumSpheres();
                }),
          /*      customThings: {
                    options: ["sphere", "plane"],
                    visible: buttonVisibility
                },*/
                lowCPU: button(() => {
                    setSphereSegments(4)
                    setButtonVisibility(true)
                }),

            },
            { expanded: false } // Set initial visibility to false
        ),
    }));


    return (
        <NumSpheresContext.Provider value={{
            numSpheres, setNumSpheres,
            sphereSize, setSphereSize,
            sphereSegments, setSphereSegments,
            increaseSize, decreaseSize,
            increaseResolution, decreaseResolution,
            incrementNumSpheres, decrementNumSpheres }}>
            {children}
        </NumSpheresContext.Provider>
    );
}

// Create a custom hook to access the numSpheres value and functions
export function useNumSpheres() {
    return React.useContext(NumSpheresContext);
}
