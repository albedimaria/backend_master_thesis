import React, {createContext, useEffect, useMemo, useState} from "react";
import { folder, useControls } from "leva";
import {useLabels} from "../../labelsContext/LabelsContext";
import * as THREE from "three";
import {useNumSpheres} from "../../basicSphereProperties/numSpheresContext/NumSpheresContext";
import SphereDataGenerator from "../../../components/spheres/SphereDataGenerator";
import {colorToHex} from "./ColorToHex";
import {labelIndexFinder} from "../../labelsContext/LabelsIndexFinder";
import LabelsDataExtractor from "../../labelsContext/LabelDataExtractor";
import {useData} from "../../DataContext";


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

    const {data, explanation} = useData()
    const { moodClassesAvailable, instrumentClassesAvailable, keyClassesAvailable } =
        LabelsDataExtractor({ explanation });

    const {numSpheres} = useNumSpheres()
    const sphereData = SphereDataGenerator()

    const [selectedFeature, setSelectedFeature] = useState(Mood_label); // You can set the initial feature as per your preference


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

            if(selectedFeature === Instrument_label){
                const fromInstrument = labelIndexFinder(instrumentClassesAvailable, sphereData[instanceId].instrument)
                const colorFromInstrument = new THREE.Color().setHSL(fromInstrument / instrumentClassesAvailable.length, 1, 0.5);
                return colorFromInstrument;
            }

            if(selectedFeature === Key_label){
                const fromLabel = labelIndexFinder(keyClassesAvailable, sphereData[instanceId].key)
                const colorFromKey = new THREE.Color().setHSL(fromLabel / keyClassesAvailable.length, 1, 0.5);
                return colorFromKey;
            }

            if(selectedFeature === BPM_label){
                const MAX_BPM = 200
                const fromBPM = sphereData[instanceId].bpm;
                const colorFromBPM = new THREE.Color().setHSL(fromBPM / MAX_BPM, 1, 0.5);
                return colorFromBPM;
            }

            if(selectedFeature === Danceability_label){
                const MAX_DANCEABILITY = 100
                const fromDanceability = sphereData[instanceId].danceability;
                const colorFromDanceability = new THREE.Color().setHSL(fromDanceability / MAX_DANCEABILITY, 1, 0.5);
                return colorFromDanceability;
            }

            // TEXTURE WILL BE ADDED AFTER

            /* if (selectedFeature === "Index") {
              const colorFromIndex = new THREE.Color().setHSL(instanceId / numSpheres, 1, 0.5);
              return colorFromIndex;
          }*/
        });
    }, [numSpheres, selectedFeature]);



    const  [selectionForColor, set] = useControls('color control', () => ({

        'color to feature': folder({
            featureSelection: {
                value: selectedFeature,
                options: [BPM_label, Mood_label, Danceability_label, Instrument_label, Key_label],
                label:  <span>select<br />feature</span>,
                onChange: (newValue) => {
                    setSelectedFeature(newValue);
                },
            },

        }, { collapsed: true })


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

