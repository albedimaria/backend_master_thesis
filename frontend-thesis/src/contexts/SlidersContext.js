import React, {createContext, useContext, useState} from 'react';
import {folder, useControls} from 'leva';
import { useLabels } from "./LabelsContext";

const SlidersContext = createContext();

export const SlidersProvider = ({ children }) => {

    const { BPM_label, Texture_label, Mood_label, Danceability_label, MoodChoicesLabels } = useLabels();

    const [moodSelected, setMoodSelected] = useState('NoMood');
    const [bpmSelected, setBpmSelected] = useState(90);
    const [textureSelected, setTextureSelected] = useState(0);
    const [danceabilitySelected, setDanceabilitySelected] = useState(100);

    const slidersControls = useControls({
        filters: folder({
            bpmSlider: {
                value: bpmSelected,
                min: 20,
                max: 200,
                step: 1,
                label: "max "+ BPM_label,
                onChange: (value) => setBpmSelected(value),
            },
            textureSlider: {
                value: textureSelected,
                min: 0,
                max: 5,
                step: 1,
                label: <span>{Texture_label}<br />layers</span>,
                onChange: (value) => setTextureSelected(value),
            },
            danceabilitySlider: {
                value: danceabilitySelected,
                min: 0,
                max: 100,
                step: 1,
                label: <span>max % of <br />{Danceability_label}</span>,
                onChange: (value) => setDanceabilitySelected(value),
            },
            moodSelector: {
                options: MoodChoicesLabels,
                value: moodSelected,
                label: Mood_label,
                onChange: (value) => setMoodSelected(value),
            },
        }),
    });




    return (
        <SlidersContext.Provider value={{
            bpmSelected, setBpmSelected,
            textureSelected, setTextureSelected,
            danceabilitySelected, setDanceabilitySelected,
            moodSelected, setMoodSelected
        }}>
            {children}
        </SlidersContext.Provider>
    );
};

export function useSliders() {
    return React.useContext(SlidersContext)
}