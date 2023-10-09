import React, {createContext, useContext, useState} from 'react';
import {button, folder, useControls} from 'leva';
import { useLabels } from "../../labelsContext/LabelsContext";

const SlidersContext = createContext();

export const SlidersProvider = ({ children }) => {
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

    const [moodSelected, setMoodSelected] = useState('all moods');
    const [textureSelectedLow, setTextureSelectedLow] = useState(0);
    const [textureSelectedHigh, setTextureSelectedHigh] = useState(5);
    const [danceabilitySelectedLow, setDanceabilitySelectedLow] = useState(0);
    const [danceabilitySelectedHigh, setDanceabilitySelectedHigh] = useState(100);
    const [instrumentSelected, setInstrumentSelected] = useState('all instrs');
    const [keySelected, setKeySelected] = useState('all keys');
    const [bpmSelectedLow, setBpmSelectedLow] = useState(20);
    const [bpmSelectedHigh, setBpmSelectedHigh] = useState(200);
    const [textSelected, setTextSelected] = useState('');
    const [showSelected, setShowSelected] = useState(false)


    const [, set] = useControls('filter', () => ({

        'by features': folder({
            bpmSlider: {
                value: [bpmSelectedLow, bpmSelectedHigh],
                min: 20,
                max: 200,
                step: 1,
                label: BPM_label,
                onChange: (value) => {
                    setBpmSelectedLow(value[0]);
                    setBpmSelectedHigh(value[1]);
                },
            },
            textureSlider: {
                value: [textureSelectedLow, textureSelectedHigh],
                min: 0,
                max: 5,
                step: 0.5,
                label: <span>{Texture_label} <br /> layers</span>,
                onChange: (value) => {
                    setTextureSelectedLow(value[0]);
                    setTextureSelectedHigh(value[1]);
                },
            },
            danceabilitySlider: {
                value: [danceabilitySelectedLow, danceabilitySelectedHigh],
                min: 0,
                max: 100,
                step: 1,
                label: <span>% of <br />{Danceability_label}</span>,
                onChange: (value) => {
                    setDanceabilitySelectedLow(value[0]);
                    setDanceabilitySelectedHigh(value[1]);
                },
            },

       /*     resetSliders: button( () => {
                // setBpmSelected(200)
            }),*/

            moodSelector: {
                options: MoodChoicesLabels,
                value: moodSelected,
                label: Mood_label,
                onChange: (value) => setMoodSelected(value),
            },
            keySelector: {
                options: KeyChoicesLabels,
                value: keySelected,
                label: Key_label,
                // default: 'all keys',
                onChange: (value) => setKeySelected(value),
            },
            instrumentSelector: {
                options: InstrumentChoicesLabels,
                value: instrumentSelected,
                label: Instrument_label,
                onChange: (value) => setInstrumentSelected(value),
            },

     /*       resetChoices: button(() => {
                setMoodSelected('NoMood'); // Reset selectors by updating the state directly
                setKeySelected('A');
                setInstrumentSelected('drums');
            }),*/

        },
        { collapsed: true }
        ),

        'by names': folder({
            showSamplesName: {
                value: showSelected,
                label: <span>samples <br/> name </span>,
                onChange: (value) => setShowSelected(value)
            },
            text: {
                value: textSelected,
                label: <span>filter <br />by name</span>,
                onChange: (value) => setTextSelected(value)
            },
            "NB": {
                value: "press enter to confirm",
                editable: false
            },
        }, { collapsed: true }
        )
    }));


    return (
        <SlidersContext.Provider value={{
            bpmSelectedLow, setBpmSelectedLow,
            bpmSelectedHigh, setBpmSelectedHigh,
            textureSelectedLow, setTextureSelectedLow,
            textureSelectedHigh, setTextureSelectedHigh,
            danceabilitySelectedLow, setDanceabilitySelectedLow,
            danceabilitySelectedHigh, setDanceabilitySelectedHigh,
            moodSelected, setMoodSelected,
            keySelected, setKeySelected,
            instrumentSelected, setInstrumentSelected,
            textSelected, setTextSelected,
            showSelected, setShowSelected,
        }}>
            {children}
        </SlidersContext.Provider>
    );
};

export function useSliders() {
    return React.useContext(SlidersContext)
}