import React, {useRef, useState} from 'react';
import {Html, useCursor} from '@react-three/drei';
// import { axios } from 'axios'
export function FileLoader() {

    const [files, setFiles] = useState(null)
    const [progress, setProgress] = useState({started: false, pc: 0})
    const [msg, setMsg] = useState(null);

    const [hovered, setHovered] = useState()
    useCursor(hovered, 'pointer', 'auto', document.body)


    function handleUpload() {
        if (!files) {
            setMsg("No files to upload");
            return;
        }

        const fd = new FormData();
        for (let i = 0; i < files.length; i++) {
            fd.append(`file${i+1}`, files[i])
        }
        setMsg("Uploading...");


        setProgress((prevState) => {
            return { ...prevState, started: true };
        });

        fetch('http://localhost:5000/process_audio', {
            method: 'POST',
            body: fd,
            headers: {
                "Custom-Header": "value",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log("Upload complete:", data);
                setMsg("Upload complete");
                setProgress((prevState) => {
                    return { ...prevState, completed: true };
                });
            })
            .catch((error) => {
                console.error("Upload error:", error);
                setMsg("Upload failed");
            });
    }


    return (
        <>
            <Html
                position={[40, 30, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >

                <input
                    type="file"
                    multiple={true}
                    onChange={(e) => {
                       setFiles(e.target.files)
                        // Handle the selected files, e.g., perform an upload or processing
                    }}
                />
                <button
                    onClick={ handleUpload }
                   /* onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
                    onPointerLeave={ () => { document.body.style.cursor = 'default' } }*/



                >
                    upload
                </button>

                {progress.started && <progress max={100} value={progress.pc}></progress>}
                {msg && <span>{msg}</span>}

            </Html>

        </>
    )
}




/*
import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';

export function FileLoader() {
    const folderInputRef = useRef(null);
    const [selectedFolderPath, setSelectedFolderPath] = useState(null);

    const handleSelectFolder = () => {
        if (folderInputRef.current) {
            folderInputRef.current.click(); // Trigger the file picker dialog
        }
    };

    const handleFolderChange = (event) => {
        const selectedFolder = event.target.files[0];
        if (selectedFolder) {
            // Get the path of the selected folder
            const folderPath = selectedFolder.webkitRelativePath || selectedFolder.mozFullPath || selectedFolder.path;
            setSelectedFolderPath(folderPath);

            // Print the selected folder path to the console
            console.log('Selected Folder Path:', folderPath);

            // You can now use 'folderPath' for further processing or store it in your application's state.
        }
    };

    return (
        <Html center>
            <div
                style={{
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    padding: '1rem',
                }}
                onClick={handleSelectFolder}
            >
                Select Folder
            </div>
            <input
                ref={folderInputRef}
                type="file"
                directory=""
                webkitdirectory=""
                style={{ display: 'none' }}
                onChange={handleFolderChange}
            />
        {/!*    {selectedFolderPath && (
                <p>Selected Folder: {selectedFolderPath}</p>
            )}*!/}
        </Html>
    );
}
*/
