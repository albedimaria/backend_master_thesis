import React from "react";

const LabelDataExtractor = ({ explanation }) => {
    // MOOD
    const moodData = explanation["explanation"]["mood"];
    const moodClassesAvailable = moodData["available classes"];

    // INSTRUMENT
    const instrumentData = explanation["explanation"]["instrument"];
    const instrumentClassesAvailable = instrumentData["labels"];

    // KEY
    const keyData = explanation["explanation"]["key"];
    const keyClassesAvailable = keyData["available keys"];

    return {
        moodClassesAvailable,
        instrumentClassesAvailable,
        keyClassesAvailable,
    };
};

export default LabelDataExtractor;
