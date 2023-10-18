import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Html} from "@react-three/drei";

export function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Html as="div">
            <div
                {...getRootProps()}
                style={{
                    backgroundColor: 'white', // Add a white background
                    padding: '10px', // Add padding for visual separation
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
        </Html>
    );
}
