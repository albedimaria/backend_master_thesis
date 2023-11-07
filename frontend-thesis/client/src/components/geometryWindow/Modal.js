import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from "three";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "display-block" : "display-none";
    const shape = new THREE.SphereGeometry(1, 16, 16);
    const shapeMaterial = new THREE.MeshStandardMaterial({ color: '#FFFFFF' });

    return (
        <>
            <mesh geometry={shape} material={shapeMaterial} position={[0, 0, -3]}>
                {/* Adjust the position to place the sphere where you want */}
            </mesh>

            <Html>
                <div style={modalStyle}>
                    {children}
                    <button type="button" onClick={handleClose} style={closeButtonStyle}>
                        X
                    </button>
                </div>
            </Html>
        </>
    );
};

const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 0, 0, 0.9)",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #fff",
    color: "#fff",
    textAlign: "center",
    zIndex: 1000,
};

const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
};

export default Modal;










/*
    import './modal.css'; // Use a relative path to your CSS file

    const Modal = ({ handleClose, show, children }) => {
        const showHideClassName = show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    {children}
                    <button type="button" onClick={handleClose}>
                        Close
                    </button>
                </section>
            </div>
        );
    };

    export default Modal;*/
