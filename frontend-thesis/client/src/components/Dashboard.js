import React, { useState } from "react";
import { Html } from "@react-three/drei";
import Modal from "./Modal.js";
import '../styles/modal.css'; // Import the CSS file here

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [hidden, set] = useState()

    const showModalHandler = () => {
        setShowModal(true);
    };

    const hideModalHandler = () => {
        setShowModal(false);
    };

    return (
        <group>
            <Html
                position={[20, 25, 0]}
                occlude
                onOcclude={set}
                style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                }}
            >
                <div>
                    <button onClick={showModalHandler}>info</button>
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

export default Dashboard;

