import React, {createContext, useEffect, useMemo, useState} from "react";
import { folder, useControls } from "leva";
import {useLabels} from "../../labelsContext/LabelsContext";
import {useNumSpheres} from "../../basicSphereProperties/numSpheresContext/NumSpheresContext";
import SphereDataGenerator from "../../../components/spheres/SphereDataGenerator";
import LabelsDataExtractor from "../../labelsContext/LabelDataExtractor";
import {useData} from "../../dataFromBackend/DataContext";


const ViewContext = createContext()
export const ViewProvider = ({ children }) => {

    const [distanceFactor, setDistanceFactor] = useState(20);
    const [opacity, setOpacity] = useState(0.5);
    const [backColor, setBackColor] = useState("#ff00ff");
    const [darkMode, setDarkMode] = useState(true);

    const  [selectionForColor, set] = useControls('view control', () => ({

        'custom settings': folder({
            distanceFactor: {
                value: distanceFactor,
                min: 10,
                max: 50,
                step: 0.5,
                label:  <span>distance<br />factor</span>,
                onChange: (newValue) => {
                    setDistanceFactor(newValue);
                },
            },
            background: {
                value: darkMode ? 'black' : backColor,
            },

            darkMode: {
                value: darkMode,
                onChange: (newValue) => {setDarkMode(newValue);}
            },

            opacity: {
                value: opacity,
                min: 0,
                max: 1,
                step: 0.01,
                onChange: (newValue) => {
                    setOpacity(newValue)
                }
            }

        }, {
            collapsed: true,
            oneLineLabels: true
        })


    }))







    return(
        <ViewContext.Provider value={{ distanceFactor, backColor }} >
            {children}
        </ViewContext.Provider>
    )
}

export function useLevaView() {
    return React.useContext(ViewContext)
}

// <color args={[ backgroundStyle ]} attach="background" />

