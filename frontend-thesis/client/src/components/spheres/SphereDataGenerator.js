import { useMemo } from 'react';
import {useData} from "../../contexts/DataContext";
import getNameToShow from "../../contexts/labelsContext/ChangingNameFunction";
import {getLabelContent} from "../labels/LabelsFromAxisFunction";
import {useOptions} from "../../contexts/levaControls/axisControls/OptionsContext";


function SphereDataGenerator() {

    const {data, explanation} = useData()


    const sphereData = useMemo(() => {

        return data.map((sphere, instanceId) => ({
            bpm: sphere.BPM,
            danceability: sphere.danceability,
            mood: sphere.mood,
            texture: 1,
            instrument: sphere.instrument,
            key: "F",
            index: instanceId,
            name: sphere.file_name,
            color: sphere.color,
        }));
    }, [data]);

    return sphereData


}

export default SphereDataGenerator;




/*    const sphereData = useMemo(
        () =>
            Array.from({ length: numSpheres }, (_, instanceId) => ({
                bpm: getBpm(instanceId),
                danceability: getDanceability(instanceId),
                mood: getMood(instanceId),
                texture: getTexture(instanceId),
                instrument: getInstrument(instanceId),
                key: getKey(instanceId),
                index: getIndex(instanceId),
                name: getName(instanceId, getIndex, getInstrument, getKey),
                // selected: getSelection(i, isSelected)
            })),
        [numSpheres, getBpm, getDanceability, getMood, getTexture, getInstrument, getKey, getIndex, getName]
    );*/