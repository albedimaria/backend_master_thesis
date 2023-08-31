import {OrbitControls} from "@react-three/drei";
import React, { useState, useEffect } from "react";
import LightsAndShadows from "./components/LightsAndShadows";
import Plane from "./components/Plane.js";
import { Physics, Debug} from "@react-three/rapier";
import Spheres from "./components/Spheres";
import {NumSpheresProvider} from "./contexts/NumSpheresContext";
import {Perf} from "r3f-perf";
import {LabelsProvider} from "./contexts/LabelsContext";
import {OptionsProvider} from "./contexts/OptionsContext";
import WelcomeText from "./components/WelcomeText";
import Popup from "./components/Popup";
import {SlidersProvider} from "./contexts/SlidersContext";
import {SpherePropertiesProvider} from "./contexts/SpherePropertiesContext";
import {ScaleLoader} from "react-spinners";


export default function Experience() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 3 seconds
    }, []);

    return (
        <>
                    <OrbitControls enableDamping={true} makeDefault={true} target={[20, 10, 0]} />
                    <Perf position={"top-left"} />
                    <Physics>
                        <Debug />
                        <NumSpheresProvider>
                            <>
                                <LabelsProvider>
                                    <SlidersProvider>
                                        <OptionsProvider>
                                            <SpherePropertiesProvider>
                                                <WelcomeText />
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
                    </Physics>
                </>
    );
}