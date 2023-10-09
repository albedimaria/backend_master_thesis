
/*// VISIBILITY FOR EACH SPHERE
const visibility = useMemo(() => {
    return sphereData.map((sphereProperties) => {
        return calculateVisibility(
            sphereProperties,
            bpmSelectedLow,
            bpmSelectedHigh,
            textureSelectedLow,
            textureSelectedHigh,
            danceabilitySelectedLow,
            danceabilitySelectedHigh,
            moodSelected,
            keySelected,
            instrumentSelected,
            textSelected
        );
    });
}, [sphereData, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh, danceabilitySelectedLow, danceabilitySelectedHigh,
    moodSelected, instrumentSelected, keySelected, textSelected]);
*/

/*// VISIBILITY FUNCTION
    const calculateVisibility = useCallback(
        (sphereProperties, bpmSelectedLow, bpmSelectedHigh, textureSelectedLow, textureSelectedHigh,
         danceabilitySelectedLow, danceabilitySelectedHigh, moodSelected, keySelected, instrumentSelected, textSelected
        ) => {
            const {bpm, texture, danceability, mood, instrument, key, name} = sphereProperties;


            if (textSelected) {
                // If textSelected is not empty, apply filtering based on textSelected
                if (
                    name[0].includes(textSelected) ||
                    name[2].includes(textSelected) ||
                    name[4].includes(textSelected)
                ) {
                    return true; // Sphere matches the name filter
                } else {
                    return false; // Sphere does not match the name filter
                }

            } else {
                // If textSelected is empty, apply other filters
                if (
                    bpmSelectedLow <= bpm && bpm <= bpmSelectedHigh &&
                    textureSelectedLow <= texture && texture <= textureSelectedHigh &&
                    danceabilitySelectedLow <= danceability && danceability <= danceabilitySelectedHigh &&
                    (mood === moodSelected || moodSelected === 'all moods') &&
                    (instrument === instrumentSelected || instrumentSelected === 'all instrs') &&
                    (key === keySelected || keySelected === 'all keys')
                ) {
                    return true; // Sphere matches other filters
                } else {
                    return false; // Sphere does not match other filters
                }
            }
        },
        [] // Make sure to include textSelected in the dependency array
    );*/