import React, { createContext } from 'react';
import {useData} from "../DataContext";
import LabelsDataExtractor from "./LabelDataExtractor";

const LabelsContext = createContext();

export const LabelsProvider = ({ children }) => {

    const {data, explanation} = useData()


    // Use the LabelsDataExtractor component to extract label data
    const { moodClassesAvailable, instrumentClassesAvailable, keyClassesAvailable } =
        LabelsDataExtractor({ explanation });


    const labels = {
        BPM_label: "BPM",
        Texture_label: "Texture",
        Mood_label: "Mood",
        Danceability_label: "Danceability",
        Key_label: "Key",
        Instrument_label: "Instrument",

        MoodChoicesLabels: moodClassesAvailable,
        InstrumentChoicesLabels: instrumentClassesAvailable,
        KeyChoicesLabels: keyClassesAvailable,
        OptionsLabels: ['BPM', 'Texture', 'Mood', 'Danceability', 'Instrument', 'Key'],
    };




    return (
        <LabelsContext.Provider value={ labels }>
            {children}
        </LabelsContext.Provider>
    );
};

export function useLabels(){
    return React.useContext(LabelsContext)
}