// VisibilityUtils.js
import { useCallback } from 'react';
import {useSliders} from "../contexts/levaControls/filtersControls/SlidersContext";
import SphereDataGenerator from "../components/spheres/SphereDataGenerator";

export const useVisibility = () => {

    const sphereData = SphereDataGenerator();

    // FILTERS
    const {
        bpmSelectedLow,
        bpmSelectedHigh,
        textureSelectedLow,
        textureSelectedHigh,
        danceabilitySelectedLow,
        danceabilitySelectedHigh,
        moodSelected,
        keySelected,
        instrumentSelected,
        textSelected,
    } = useSliders()

    // Visibility function

    const visibility = useCallback((sphere, filters) => {
        const {
            bpmSelectedLow,
            bpmSelectedHigh,
            textureSelectedLow,
            textureSelectedHigh,
            danceabilitySelectedLow,
            danceabilitySelectedHigh,
            moodSelected,
            keySelected,
            instrumentSelected,
            textSelected,
        } = filters;

        // Extract sphere properties
        const {
            bpm,
            texture,
            danceability,
            mood,
            instrument,
            key,
            name,
        } = sphere;

        if (textSelected) {
            // If textSelected is not empty, apply filtering based on textSelected
            const isVisible = (
                name[0].includes(textSelected) ||
                name[2].includes(textSelected) ||
                name[4].includes(textSelected)
            );

            // console.log(`Visibility for sphere with name "${name}" based on textSelected: ${isVisible}`);

            return isVisible;

        } else {
            // If textSelected is empty, apply other filters
            const isVisible = (
                bpmSelectedLow <= bpm &&
                bpm <= bpmSelectedHigh &&
                textureSelectedLow <= texture &&
                texture <= textureSelectedHigh &&
                danceabilitySelectedLow <= danceability &&
                danceability <= danceabilitySelectedHigh &&
                (mood === moodSelected || moodSelected === 'all moods') &&
                (instrument === instrumentSelected || instrumentSelected === 'all instrs') &&
                (key === keySelected || keySelected === 'all keys')
            );
            // console.log(`Visibility for sphere with name "${name}" based on other filters: ${isVisible}`);

            return isVisible;
        }
    }, [sphereData, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh, danceabilitySelectedLow, danceabilitySelectedHigh,
        moodSelected, instrumentSelected, keySelected, textSelected]);

    return visibility
};
