import '../4.2+/App.css';
// import './J_draft';
import React from "react";
import {useState, useMemo} from 'react';
import Clicker from "./Clicker";
import People from "./People";


function App(clickersCount, children) {

    const [hasClicker, setHasClicker] = useState(true)
    const [count, setCount] = useState(0)

    const toggerClickerClick = () =>
    {
        setHasClicker(!hasClicker)
    }

    const increment = () =>
    {
        setCount(count +1)
    }

    clickersCount = 3

    const colors = useMemo(() => {
        const colors = []

        for(let i = 0; i < clickersCount; i++)
            colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`)

        return colors
    }, [clickersCount])

  return (
    <div className="App">
        <title>Front-end Thesis</title>
        <body>
       {/* <div className="progress-bar-container">
            <label for="progress-bar">Loading...</label>
            <progress id="progress-bar" value="0" max={100}></progress>
        </div>*/}
        <div> total count: {count}</div>

        <button onClick={toggerClickerClick}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>

       {hasClicker && <>
           {[...Array(clickersCount)].map((value, index) =>
                <Clicker
                    key = {index}
                    increment={increment}
                    keyName ={`count${index}`}
                    color = {colors}
                />
           )}
       </>}
       <People/>

        </body>


{/*
        <script src="J_draft.js" type="module"></script>
*/}


    </div>
  );
}

export default App;
