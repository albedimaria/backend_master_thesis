import React from 'react';
export const clickHandle = (e) => {
    e.stopPropagation();
    console.log("Instance ID:", e.instanceId);
}

export const rightClickHandle = (e) => {
    e.stopPropagation();
    console.log("Instance ID:", e.instanceId);
}

