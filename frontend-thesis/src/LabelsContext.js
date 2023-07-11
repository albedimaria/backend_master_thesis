import React, { createContext } from 'react';

const LabelsContext = createContext();

export const LabelsProvider = ({ children }) => {

    const labels = {
        BPM: "BPM",
        Texture: "Texture",
        Mood: "Mood",
        Danceability: "Danceability",
        MoodChoices: ['happy', 'sad', 'purple', 'calm', 'excited']
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