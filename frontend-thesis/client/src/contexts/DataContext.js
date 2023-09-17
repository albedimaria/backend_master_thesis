import React, {createContext, useEffect, useState} from "react";

const DataContext = createContext()

export const DataProvider = ({children}) => {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/process_audio").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                // console.log(data)
            }
        )
    }, [])

    return (
        <DataContext.Provider value ={ data } >
            { children }
        </DataContext.Provider>
    )
}

export function useData(){
    return React.useContext(DataContext)
}
