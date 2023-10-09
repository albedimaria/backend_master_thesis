import React, {useState} from 'react';
import LabelsState from "../contexts/labelsContext/LabelsState";
import sphereDataGenerator from "../components/spheres/SphereDataGenerator";



export const rightClickHandle = (e) => {
    e.stopPropagation();
    console.log("Instance ID:", e.instanceId);
}

/*const [temp, setTemp] = useState(false);
const longLeftClick = (event) => {
    console.log('long left click occurred')
    setTemp((prevTemp) => (!prevTemp))
}*/

// const { labelVisibility, setLabelVisibility } = LabelsState()
// const [labelVisibility, setLabelVisibility] = useState(new Array(sphereData.length).fill(false));

const clickHandle = (e) => {

    const sphereData = sphereDataGenerator()
    const { labelVisibility, setLabelVisibility } = LabelsState()

    e.stopPropagation();
    setLabelVisibility((prevLabelVisibility) => {
        prevLabelVisibility[e.instanceId] = !prevLabelVisibility[e.instanceId];
        // console.log(`Label visibility for Instance ID ${e.instanceId} toggled to ${prevLabelVisibility[e.instanceId]}`);
        return [...prevLabelVisibility];
    });
    // console.log("Instance ID:", e.instanceId);
}

export default clickHandle

