import { createContext, useEffect, useState }  from "react";
import React from "react"
import data from "./backend_analysis.json"
import explanation from "./explanation"


const DataContext = createContext()

export const DataProvider = ({children}) => {

    // const [data, setData] = useState([{}])

/*    useEffect(() => {
        fetch("/process_audio").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                // console.log(data)
            }
        )
    }, [])*/

    // console.log(data.length)


    return (
        <DataContext.Provider value = {{data, explanation} } >
            { children }
        </DataContext.Provider>
    )
}

export function useData(){
    return React.useContext(DataContext)
}