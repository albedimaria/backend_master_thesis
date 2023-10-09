import React, {createContext, useMemo, useState} from "react";
import { folder, useControls } from "leva";
import {useLabels} from "../../labelsContext/LabelsContext";
import * as THREE from "three";
import {useNumSpheres} from "../../basicSphereProperties/numSpheresContext/NumSpheresContext";


const LevaColorDropboxContext = createContext()
export const LevaColorDropboxProvider = ({ children }) => {

    const {
        BPM_label,
        Texture_label,
        Mood_label,
        Danceability_label,
        Key_label,
        Instrument_label,
        MoodChoicesLabels,
        KeyChoicesLabels,
        InstrumentChoicesLabels,
    } = useLabels();

    const {numSpheres} = useNumSpheres()
    console.log(numSpheres)

    const [selectedFeature, setSelectedFeature] = useState(Mood_label); // You can set the initial feature as per your preference

    const calculateSphereColor  = (selectedFeature) => {
        return console.log(selectedFeature)

    }

    // COLORS
    const colors = useMemo(() => {
        return Array.from({length: numSpheres}, (_, instanceId) => {
            const color = new THREE.Color().setHSL(instanceId / numSpheres, 1, 0.5);
            return color;
        });
    }, [numSpheres]);
    console.log(colors)

    const  [selectionForColor, set] = useControls('Color Control', () => ({

        'color to feature': folder({
            featureSelection: {
                value: selectedFeature, // Initialize with the selectedFeature state
                options: [BPM_label, Mood_label, Danceability_label], // Add your feature options here
                label:  <span>select<br />feature</span>,
                onChange: (newValue) => {
                    setSelectedFeature(newValue); // Update the selectedFeature state when the dropdown changes
                },
            },

        })


    }))







    return(
        <LevaColorDropboxContext.Provider value={{colors}} >
            {children}
        </LevaColorDropboxContext.Provider>
    )
}

export function useColorsDropbox() {
    return React.useContext(LevaColorDropboxContext)
}

