import {Box, Html, OrbitControls} from "@react-three/drei";
import React, {useState, useEffect, useRef} from "react";
import LightsAndShadows from "./components/inProgress/LightsAndShadows";
import Plane from "./components/plane/Plane.js";
import { Physics, Debug} from "@react-three/rapier";
import Spheres from "./components/spheres/Spheres";
import { NumSpheresProvider} from "./contexts/basicSphereProperties/numSpheresContext/NumSpheresContext";
import { Perf } from "r3f-perf";
import { LabelsProvider} from "./contexts/labelsContext/LabelsContext";
import { OptionsProvider} from "./contexts/levaControls/axisControls/OptionsContext";
import { SlidersProvider} from "./contexts/levaControls/filtersControls/SlidersContext";
import {  DataProvider } from "./contexts/dataFromBackend/DataContext";
import { BasicLevaProvider} from "./contexts/levaControls/basicSphereLeva/BasicLevaContext";
import { LevaColorDropboxProvider} from "./contexts/levaControls/colorDropbox/LevaColorDropboxContext";
import { ViewProvider } from "./contexts/levaControls/viewsControls/viewsContext";
import {MyDropzone} from "./components/inProgress/Drag&Drop";
import {FileLoader} from "./components/inProgress/FileLoader";
import Button from "./components/inProgress/Button";
import Dashboard from "./components/geometryWindow/Dashboard";




export default function Experience() {

    const childCanvasRef = useRef();


    /*  DELAY AT THE BEGINNING
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Simulate loading delay
            setTimeout(() => {
                setIsLoading(false);
            }, 2000); // 3 seconds
        }, []);*/

    // target is linked to index camera



    return (
        <>
            <OrbitControls enableDamping={true} makeDefault={true} target={[30, 10, 0]} />
            <Perf position={"top-left"} />
            <Physics>

                <Debug />
                <DataProvider>
                    <NumSpheresProvider>
                            <LabelsProvider>
                                <BasicLevaProvider>
                                    <SlidersProvider>
                                        <LevaColorDropboxProvider>
                                            <OptionsProvider>
                                                <ViewProvider>
                                                    <Spheres />
                                                    <Plane />
                                                    <LightsAndShadows />
                                                    <Dashboard />
                                                    <FileLoader />
                                                </ViewProvider>
                                            </OptionsProvider>
                                        </LevaColorDropboxProvider>
                                    </SlidersProvider>
                                </BasicLevaProvider>
                            </LabelsProvider>
                    </NumSpheresProvider>
                </DataProvider>

            </Physics>

        </>
    );
}