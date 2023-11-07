import React, { useState } from "react";
import { Html } from "@react-three/drei";
import Modal from "./Modal.js";
import '../../styles/modal.css'; // Import the CSS file here

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [hidden, setHidden] = useState(false); // Renamed 'set' to 'setHidden'

    const showModalHandler = () => {
        setShowModal(true);
    };

    const hideModalHandler = () => {
        setShowModal(false);
    };

    return (
        <group>
            <Html
                position={[20, 30, 0]}
                occlude
                onOcclude={setHidden} // Changed 'set' to 'setHidden'
                style={dashboardButtonStyle(hidden)}
            >
                <div>
                    <button onClick={showModalHandler} style={buttonStyle}>
                        info
                    </button>
                </div>
            </Html>

            {/* Conditionally render the modal */}
            {showModal && (
                <Modal handleClose={hideModalHandler}>
                    <p>Modal Content</p>
                </Modal>
            )}
        </group>
    );
};

const dashboardButtonStyle = (hidden) => ({
    transition: 'all 0.5s',
    opacity: hidden ? 0 : 1,
    transform: `scale(${hidden ? 0.5 : 1})`,
});

const buttonStyle = {
    background: "linear-gradient(to bottom, #8b78e6, #4d4b9b)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
};

export default Dashboard;
