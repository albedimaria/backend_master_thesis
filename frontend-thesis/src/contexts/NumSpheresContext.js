import React, { createContext, useState } from 'react'

// Create the context
const NumSpheresContext = createContext();

// Create a provider component
export function NumSpheresProvider({ children }) {

    const [numSpheres, setNumSpheres] = useState(100);

    const incrementNumSpheres = () => {
        setNumSpheres((prevNumSpheres) => prevNumSpheres + 1)
    };

    const decrementNumSpheres = () => {
        setNumSpheres((prevNumSpheres) => (prevNumSpheres === 1 ? 1 : prevNumSpheres - 1));
    };


    return (
        <NumSpheresContext.Provider value={{ numSpheres, setNumSpheres, incrementNumSpheres, decrementNumSpheres }}>
            {children}
        </NumSpheresContext.Provider>
    );
}

// Create a custom hook to access the numSpheres value and functions
export function useNumSpheres() {
    return React.useContext(NumSpheresContext);
}
