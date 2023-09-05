import React from 'react';
import { useRef, useState } from "react";

const Button = ({ children }) => {
    const buttonRef = useRef();
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(!isPressed);
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            style={{
                background: isPressed ? "red" : "green",
                color: "white",
                padding: "10px",
                cursor: "pointer",
            }}
        >
            {children}
        </button>
    );
};

export default Button;
