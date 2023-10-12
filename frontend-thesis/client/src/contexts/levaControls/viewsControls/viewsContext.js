import React, {createContext, useEffect, useMemo, useState} from "react";
import { folder, useControls } from "leva";
import {useLabels} from "../../labelsContext/LabelsContext";
import {useNumSpheres} from "../../basicSphereProperties/numSpheresContext/NumSpheresContext";
import SphereDataGenerator from "../../../components/spheres/SphereDataGenerator";
import LabelsDataExtractor from "../../labelsContext/LabelDataExtractor";
import {useData} from "../../DataContext";


const ViewContext = createContext()
export const ViewProvider = ({ children }) => {

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


    const [distanceFactor, setDistanceFactor] = useState(20);

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

        }, { collapsed: true })


    }))







    return(
        <ViewContext.Provider value={{ distanceFactor }} >
            {children}
        </ViewContext.Provider>
    )
}

export function useLevaView() {
    return React.useContext(ViewContext)
}

