// LabelsFromAxisFunction.js

export const getLabelContent = (option, sphereData) => {
    switch (option) {
        case 'BPM':
            return `BPM: ${sphereData.bpm}`;
        case 'Mood':
            return `Mood: ${sphereData.mood}`;
        case 'Texture':
            return `Texture: ${sphereData.texture}`;
        case 'Danceability':
            return `Danceability: ${sphereData.danceability}`;
        case 'Instrument':
            return `Instr: ${sphereData.instrument}`;
        case 'Key':
            return `Key: ${sphereData.key}`;
        default:
            return '';
    }
};
