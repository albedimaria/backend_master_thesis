import {OrbitControls} from "@react-three/drei";
import React from "react";
import LightsAndShadows from "./LightsAndShadows";
import Plane from "./Plane.js";
import { Physics, Debug} from "@react-three/rapier";
import Spheres from "./Spheres";
import {NumSpheresProvider} from "./NumSpheresContext";
import {Perf} from "r3f-perf";
import {LabelsProvider} from "./LabelsContext";
import {OptionsProvider} from "./OptionsContext";
import WelcomeText from "./WelcomeText";
import Popup from "./Popup";
import {SlidersProvider} from "./SlidersContext";
import {SpherePropertiesProvider} from "./SpherePropertiesContext";


export default function Experience(){
    return <>

        <OrbitControls enableDamping={true} makeDefault={true} target={[20, 0, 0]}/>

        <Perf position={"top-left"} />

        <Physics>
            <Debug />
            <NumSpheresProvider>
                <>
                    <LabelsProvider>
                        <SlidersProvider>
                            <OptionsProvider>

                                SpherePropertiesProvider
                                <WelcomeText />
                                <Popup />
                                <Spheres />
                                <Plane />
                                <LightsAndShadows />

                                SpherePropertiesProvider
                            </OptionsProvider>
                        </SlidersProvider>
                    </LabelsProvider>
                </>



            </NumSpheresProvider>

        </Physics>



    </>
}