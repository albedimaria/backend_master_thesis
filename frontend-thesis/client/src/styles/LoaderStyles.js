// LoaderStyles.js
import React from "react";

export const loaderStyles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    inner: {
        width: "200px",
        height: "20px",
        borderRadius: "10px",
        background: "#333",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
    bar: {
        width: "0%", // This will be updated dynamically
        height: "100%",
        borderRadius: "10px",
        background: "#00cc00",
    },
    data: {
        color: "#fff",
        textAlign: "center",
    },
};
