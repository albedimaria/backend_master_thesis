import React, {createContext, useEffect, useMemo, useState} from "react";
import { folder, useControls } from "leva";
import {useLabels} from "../../labelsContext/LabelsContext";
import * as THREE from "three";
import {useNumSpheres} from "../../basicSphereProperties/numSpheresContext/NumSpheresContext";
import SphereDataGenerator from "../../../components/spheres/SphereDataGenerator";
import {colorToHex} from "./ColorToHex";


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
    const sphereData = SphereDataGenerator()

    const [selectedFeature, setSelectedFeature] = useState(Mood_label); // You can set the initial feature as per your preference

    const calculateSphereColor  = (selectedFeature) => {
        return console.log(selectedFeature)

    }

// COLORS
    const colors = useMemo(() => {
        return Array.from({ length: numSpheres }, (_, instanceId) => {
            if (selectedFeature === Mood_label) {
                const colorFromSphere = sphereData[instanceId].color; // Assuming it's a valid color string

                // Convert the color string to HSL
                const hexColor = colorToHex(colorFromSphere);

                // Create a THREE.Color object from the hex color
                const colorFromMood = new THREE.Color(hexColor);
                return colorFromMood;
            }
            if (selectedFeature === "Index") {
                const colorFromIndex = new THREE.Color().setHSL(instanceId / numSpheres, 1, 0.5);
                return colorFromIndex;
            }
        });
    }, [numSpheres, selectedFeature]);



    const  [selectionForColor, set] = useControls('Color Control', () => ({

        'color to feature': folder({
            featureSelection: {
                value: selectedFeature,
                options: [BPM_label, Mood_label, Danceability_label, "Index"],
                label:  <span>select<br />feature</span>,
                onChange: (newValue) => {
                    setSelectedFeature(newValue);
                },
            },

        })


    }))







    return(
        <LevaColorDropboxContext.Provider value={{colors, selectedFeature}} >
            {children}
        </LevaColorDropboxContext.Provider>
    )
}

export function useColorsDropbox() {
    return React.useContext(LevaColorDropboxContext)
}

