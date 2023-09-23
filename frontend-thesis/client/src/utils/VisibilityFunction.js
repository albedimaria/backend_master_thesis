// VisibilityUtils.js
import React, { useCallback } from 'react';
import {useSliders} from "../contexts/levaControls/filtersControls/SlidersContext";
import SphereDataGenerator from "../components/spheres/SphereDataGenerator";
import getNameToShow from "../contexts/labelsContext/ChangingNameFunction";
import {getLabelContent} from "../components/labels/LabelsFromAxisFunction";
import {useOptions} from "../contexts/levaControls/axisControls/OptionsContext";

export const useVisibility = () => {

    const sphereData = SphereDataGenerator();
    const { selectedOptionX, selectedOptionY, selectedOptionZ } = useOptions()

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

        const feature = [
            getLabelContent(selectedOptionX, sphere),
            getLabelContent(selectedOptionY, sphere),
            getLabelContent(selectedOptionZ, sphere)]

        // console.log(feature)

        if (textSelected) {
            // If textSelected is not empty, apply filtering based on textSelected


            const isVisible = (
                name.includes(textSelected) ||
                feature.some((item) => item.includes(textSelected))
            );

            console.log(`Visibility for "${name}" based on textSelected "${textSelected}": ${isVisible}`);
            console.log(`Text Selected: "${textSelected}"`);
            return isVisible;
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
        moodSelected, instrumentSelected, keySelected, textSelected, selectedOptionX, selectedOptionY, selectedOptionZ]);

    return visibility
};
