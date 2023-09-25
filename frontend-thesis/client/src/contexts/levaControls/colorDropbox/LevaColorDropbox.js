import {useControls} from "leva";
import {useState} from "react";


const LevaColorDropbox = () => {

    const [selectedFeature, setSelectedFeature] = useState('texture'); // You can set the initial feature as per your preference

    const calculateSphereColor  = (selectedFeature) => {
        return console.log(selectedFeature)
    }

    const  [featureSelection, set] = useControls('Color Control', {
        featureSelection: {
            value: selectedFeature, // Initialize with the selectedFeature state
            options: ['bpm', 'texture', 'danceability'], // Add your feature options here
            label: 'Select Feature to Associate with Color',
            onChange: (newValue) => {
                setSelectedFeature(newValue); // Update the selectedFeature state when the dropdown changes
            },
        },
    });
}


export default LevaColorDropbox