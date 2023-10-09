import React from 'react';
import { Html } from '@react-three/drei'
import '../../styles/modal.css'; // Import the CSS file here
import '../../styles/style.css'


const Modal = ({ handleClose, show, children }) => {

    const showHideClassName = show ? "display-block" : "display-none";


    return (
        <Html
            style={{
                position: "fixed",
                backgroundColor: "red",
                width: 80,
                height: 120,
                // transform:
            }}
        >
            <div >
                    {children}
                    <button type="button" onClick={handleClose}>
                        Close
                    </button>

            </div>
        </Html>
    );
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
