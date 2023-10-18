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
        {/*    {selectedFolderPath && (
                <p>Selected Folder: {selectedFolderPath}</p>
            )}*/}
        </Html>
    );
}
