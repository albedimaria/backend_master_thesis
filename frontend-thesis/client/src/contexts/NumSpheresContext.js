import React, { createContext, useState } from 'react'
import {button, folder, useControls} from "leva";

// Create the context
const NumSpheresContext = createContext();

// Create a provider component
export function NumSpheresProvider({ children }) {

    const [numSpheres, setNumSpheres] = useState(50);
    const [sphereSegments, setSphereSegments] = useState(8);
    const [sphereSize, setSphereSize] = useState(0.3)
    // const [sizeDisabled, setSizeDisabled] = useState(false)

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


    const [, set] = useControls(
        'spheres', () => ({

        'size control': folder(
            {
                'decrease size': button(() => {
                    decreaseSize();
                    if (sphereSize === 0.3) {
                    }
                }, { disabled: false }),

                // foo: button((get) => alert(`Number value is ${get('number')}`), { disabled: true }),

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
          /*      customThings: {
                    options: ["sphere", "plane"],
                    visible: buttonVisibility
                },*/

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
