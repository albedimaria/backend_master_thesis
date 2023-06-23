import React from "react";
import { useRef, useState, useEffect } from 'react'
// back quotes: ``


export default function Clicker({increment, keyName, color = 'black'}) // default value
{
    const [count, setCount] = useState(localStorage.getItem(keyName) ?? 0)
    const buttonRef = useRef()

    useEffect(() => {
        buttonRef.current.style.backgroundColor = 'papayawhip' // remember to always put current
        buttonRef.current.style.color = 'salmon'
        return () => {
            localStorage.removeItem(keyName)
        }
    }, [])

    useEffect(() =>
    {
        localStorage.setItem(keyName, count)
    }, [count])

    const buttonClick = () =>
    {
      setCount(count + 1)
        // setCount((value) => {return value +1 }) alternative method
        // setCount (value => value +1) // in this easy case - BEST
        increment()
    }

    return <div>
        <div style={{color : color}}>Clicks count: {count}</div>
        <button ref={buttonRef} onClick={buttonClick}>Click me</button>
    </div>
};