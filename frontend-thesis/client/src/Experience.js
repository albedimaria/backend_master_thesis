import {Box, OrbitControls} from "@react-three/drei";
import React, { useState, useEffect } from "react";
import LightsAndShadows from "./components/inProgress/LightsAndShadows";
import Plane from "./components/plane/Plane.js";
import { Physics, Debug} from "@react-three/rapier";
import Spheres from "./components/spheres/Spheres";
import {NumSpheresProvider} from "./contexts/basicSphereProperties/numSpheresContext/NumSpheresContext";
import {Perf} from "r3f-perf";
import {LabelsProvider} from "./contexts/labelsContext/LabelsContext";
import {OptionsProvider} from "./contexts/levaControls/axisControls/OptionsContext";
import WelcomeText from "./components/inProgress/WelcomeText";
import Popup from "./components/inProgress/Popup";
import {SlidersProvider} from "./contexts/levaControls/filtersControls/SlidersContext";
import {SpherePropertiesProvider} from "./contexts/SpherePropertiesContext";
import {ScaleLoader} from "react-spinners";
import Dashboard from "./components/inProgress/Dashboard";
import InfoSphere from "./components/inProgress/InfoSphere";
import { DataProvider } from "./contexts/DataContext";
import {BasicLevaProvider} from "./contexts/levaControls/basicSphereLeva/BasicLevaContext";
import {LevaColorDropboxProvider} from "./contexts/levaControls/colorDropbox/LevaColorDropboxContext";

export default function Experience() {

/*  DELAY AT THE BEGINNING
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 3 seconds
    }, []);*/

    return (
        <>
            <OrbitControls enableDamping={true} makeDefault={true} target={[20, 10, 0]} />
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
                                                {/*
                                            <Dashboard />
*/}
                                                {/*   <InfoSphere />*/}
                                                {/*
                                            <Popup />
*/}
                                                <Spheres />
                                                <Plane />
                                                <LightsAndShadows />
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