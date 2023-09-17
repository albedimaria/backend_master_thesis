import React, { createContext, useState } from 'react'
import {button, folder, useControls} from "leva";
import {useData} from "./DataContext";

// Create the context
const NumSpheresContext = createContext();

// Create a provider component
export function NumSpheresProvider({ children }) {

    const data = useData()
    // console.log(data.length)
    const [numSpheres, setNumSpheres] = useState(20);
    const [sphereSegments, setSphereSegments] = useState(4);
    const [sphereSize, setSphereSize] = useState(0.3)

    // RESOLUTION INCREMENT / DECREMENT
    const increaseResolution = () => {
        setSphereSegments((prevSphereSegments) => prevSphereSegments * 2);
    }

    const decreaseResolution = () => {
        setSphereSegments((prevSphereSegments) => prevSphereSegments / 2);
    }

    // SIZE INCREMENT / DECREMENT
    const increaseSize = () => {
        setSphereSize((prevSphereSize) => prevSphereSize * 2);
    }

    const decreaseSize = () => {
        setSphereSize((prevSphereSize) => Math.max(prevSphereSize / 2, 0.1));
    }

    // # INCREMENT / DECREMENT
    const incrementNumSpheres = () => {
        setNumSpheres((prevNumSpheres) => prevNumSpheres + 1)
    };

    const decrementNumSpheres = () => {
        setNumSpheres((prevNumSpheres) => (prevNumSpheres === 1 ? 1 : prevNumSpheres - 1));
    };

    // GUI LEVA CONTROLS
    const [, set] = useControls(
        'spheres', () => ({

        'size control': folder(
            {
                'decrease size': button(() => {
                    decreaseSize();
                    if (sphereSize === 0.3) {
                    }
                }, { disabled: false }),

                'increase size': button(() => {
                    increaseSize();
                }),
            }, { collapsed: true }
        ),

        'resolution and performance': folder(
            {
                'lower resolution': button(() => {
                    decreaseResolution()
                }),
                'higher resolution': button(() => {
                    increaseResolution();
                }),
                'add sphere': button(() => {
                    incrementNumSpheres();
                }),
                'remove sphere': button(() => {
                    decrementNumSpheres();
                }),

                'slow CPU? Press here': button(() => {
                    setSphereSegments(4)
                }),

            },
            {
                collapsed: true,
                color: "white",
                hideCopyButton: true,
                fill: true
            }
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
