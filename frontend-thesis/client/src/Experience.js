import {Box, OrbitControls} from "@react-three/drei";
import React, { useState, useEffect } from "react";
import LightsAndShadows from "./components/LightsAndShadows";
import Plane from "./components/plane/Plane.js";
import { Physics, Debug} from "@react-three/rapier";
import Spheres from "./components/spheres/Spheres";
import {NumSpheresProvider} from "./contexts/NumSpheresContext";
import {Perf} from "r3f-perf";
import {LabelsProvider} from "./contexts/LabelsContext";
import {OptionsProvider} from "./contexts/OptionsContext";
import WelcomeText from "./components/inProgress/WelcomeText";
import Popup from "./components/Popup";
import {SlidersProvider} from "./contexts/SlidersContext";
import {SpherePropertiesProvider} from "./contexts/SpherePropertiesContext";
import {ScaleLoader} from "react-spinners";
import Dashboard from "./components/inProgress/Dashboard";
import InfoSphere from "./components/InfoSphere";
import { DataProvider } from "./contexts/DataContext";

export default function Experience() {
    const [isLoading, setIsLoading] = useState(true);

/*    useEffect(() => {
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
                                <>
                                    <LabelsProvider>
                                        <SlidersProvider>
                                            <OptionsProvider>
                                                <SpherePropertiesProvider>
                                                    <Dashboard />
{/*                                                    <InfoSphere />*/}
                                                    <Popup />
                                                    <Spheres />
                                                    <Plane />
                                                    <LightsAndShadows />
                                                </SpherePropertiesProvider>
                                            </OptionsProvider>
                                        </SlidersProvider>
                                    </LabelsProvider>
                                </>
                            </NumSpheresProvider>
                        </DataProvider>

                    </Physics>
                </>
    );
}