import {OrbitControls} from "@react-three/drei";
import React from "react";
import LightsAndShadows from "./LightsAndShadows";
import Plane from "./Plane.js";
import { Physics, Debug} from "@react-three/rapier";
import Spheres from "./Spheres";

export default function Experience(){
    return <>

        <OrbitControls enableDamping={true} makeDefault={true} />

        <Physics>
            <Debug />
            <Spheres />
            <Plane />
            <LightsAndShadows />
        </Physics>



    </>
}