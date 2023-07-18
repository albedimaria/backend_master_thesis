import React, { createContext } from 'react';

const LabelsContext = createContext();

export const LabelsProvider = ({ children }) => {

    const labels = {
        BPM_label: "BPM",
        Texture_label: "Texture",
        Mood_label: "Mood",
        Danceability_label: "Danceability",
        MoodChoicesLabels: ['happy', 'sad', 'purple', 'calm', 'excited'],
        OptionsLabels: ['BPM', 'Texture', 'Mood', 'Danceability'],
    };



    return (
        <LabelsContext.Provider value={labels}>
            {children}
        </LabelsContext.Provider>
    );
};

export function useLabels(){
    return React.useContext(LabelsContext)
}