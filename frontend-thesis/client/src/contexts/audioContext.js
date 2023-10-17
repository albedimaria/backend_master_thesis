import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { AudioLoader } from "three";

function AudioPlayer({ url }) {
    const audioRef = useRef();

    const buffer = useLoader(AudioLoader, url);

    audioRef.current.setBuffer(buffer);
    audioRef.current.setLoop(true);
    audioRef.current.setVolume(0.5);

    // Initial state, audio is not playing
    let isAudioPlaying = false;

    const handleContextMenu = (event) => {
        event.preventDefault(); // Prevent the default right-click context menu

        if (isAudioPlaying) {
            audioRef.current.pause();
            isAudioPlaying = false;
        } else {
            audioRef.current.play();
            isAudioPlaying = true;
        }
    };

    console.log("AudioPlayer")

}

export default AudioPlayer;
