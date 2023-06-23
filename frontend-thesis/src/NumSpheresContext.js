import React, { createContext, useState } from 'react';

// Create the context
const NumSpheresContext = createContext();

// Create a provider component
export function NumSpheresProvider({ children }) {
    const [numSpheres, setNumSpheres] = useState(10);

    // Define any functions to update the numSpheres value here
    // For example, you can create an increment function:
    const incrementNumSpheres = () => {
        setNumSpheres(prevNumSpheres => prevNumSpheres + 1);
    };

    // Pass the numSpheres value and functions through the context provider
    return (
        <NumSpheresContext.Provider value={{ numSpheres, incrementNumSpheres }}>
            {children}
        </NumSpheresContext.Provider>
    );
}

// Create a custom hook to access the numSpheres value and functions
export function useNumSpheres() {
    return React.useContext(NumSpheresContext);
}
