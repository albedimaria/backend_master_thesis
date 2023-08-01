import React, { createContext } from 'react';

const LabelsContext = createContext();

export const LabelsProvider = ({ children }) => {

    const labels = {
        BPM_label: "BPM",
        Texture_label: "Texture",
        Mood_label: "Mood",
        Danceability_label: "Danceability",
        Key_label: "Key",
        Instrumental_label: "Instrumental",

        MoodChoicesLabels: ['all moods', 'noMood', 'happy', 'sad', 'purple', 'calm', 'excited'],
        InstrumentalChoicesLabels: ['all instrs', 'drums', 'horn', 'sax', 'piano', 'guitar'],
        KeyChoicesLabels: ['all keys', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
        OptionsLabels: ['BPM', 'Texture', 'Mood', 'Danceability', 'Instrumental', 'Key'],
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