import React, {createContext, useState} from 'react';
import BasicSphereLevaFunctions from "./BasicSphereLevaFunctions";
import {button, folder, useControls} from "leva";
import GeometrySphere from "../../basicSphereProperties/geometricProperties/GeometrySphere";
import {useNumSpheres} from "../../basicSphereProperties/numSpheresContext/NumSpheresContext";

const BasicLevaContext = createContext()

export const BasicLevaProvider = ({ children }) => {

    const {
        increaseResolution,
        decreaseResolution,
        increaseSize,
        decreaseSize,
    } = BasicSphereLevaFunctions();

    const { numSpheres,
        sphereSize, setSphereSize,
        sphereSegments, setSphereSegments } = useNumSpheres()


    const [basicLeva, set] = useControls(
        'spheres', () => ({

            'size control': folder(
                {
                    'decrease size': button(() => {
                        decreaseSize();
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
        <BasicLevaContext.Provider value={ basicLeva }>
            { children }
        </BasicLevaContext.Provider>
    )
}
