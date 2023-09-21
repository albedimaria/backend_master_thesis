import React, { createContext, useState } from 'react'
import {useData} from "../../DataContext";
import GeometrySphere from "../geometricProperties/GeometrySphere";

const NumSpheresContext = createContext();

export function NumSpheresProvider({ children }) {

    const {data, } = useData()

    const numSpheres = data.length

    const {  sphereSize, setSphereSize,
        sphereSegments, setSphereSegments } = GeometrySphere()

    return (
        <NumSpheresContext.Provider value={{
            numSpheres,
            sphereSize, setSphereSize,
            sphereSegments, setSphereSegments
             }}>
            {children}
        </NumSpheresContext.Provider>
    );
}

// Create a custom hook to access the numSpheres value and functions
export function useNumSpheres() {
    return React.useContext(NumSpheresContext);
}
