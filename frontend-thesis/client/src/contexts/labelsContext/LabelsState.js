import { useState } from "react";
import { useData } from "../dataFromBackend/DataContext";

const LabelsState = () => {

    const sphereData = useData()
    const [labelVisibility, setLabelVisibility] = useState(new Array(sphereData.length).fill(false));

    return {
        labelVisibility, setLabelVisibility
    }
}

export default LabelsState
