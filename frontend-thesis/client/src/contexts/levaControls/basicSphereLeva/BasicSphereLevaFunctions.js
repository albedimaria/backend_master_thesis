import GeometrySphere from "../../basicSphereProperties/geometricProperties/GeometrySphere";
import {useState} from "react";
import {useNumSpheres} from "../../basicSphereProperties/numSpheresContext/NumSpheresContext";

const BasicSphereLevaFunctions = () => {

    const { numSpheres,
        sphereSize, setSphereSize,
        sphereSegments, setSphereSegments } = useNumSpheres()


    // RESOLUTION INCREMENT / DECREMENT
    const increaseResolution = () => {
        setSphereSegments((prevSphereSegments) => prevSphereSegments * 2);
    };

    const decreaseResolution = () => {
        setSphereSegments((prevSphereSegments) => prevSphereSegments / 2);
    };

    // SIZE INCREMENT / DECREMENT
    const increaseSize = () => {
        // console.log("Increase size button clicked");
        setSphereSize((prevSphereSize) => prevSphereSize * 2);
    };

    const decreaseSize = () => {
        // console.log("Decrease size button clicked");
        setSphereSize((prevSphereSize) => Math.max(prevSphereSize / 2, 0.1));
    }


    // Return the state and functions
    return {
        increaseResolution,
        decreaseResolution,
        increaseSize,
        decreaseSize,
    };
};

export default BasicSphereLevaFunctions;

