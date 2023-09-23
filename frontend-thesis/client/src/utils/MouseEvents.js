import React, {useState} from 'react';



export const rightClickHandle = (e) => {
    e.stopPropagation();
    console.log("Instance ID:", e.instanceId);
}

/*const [temp, setTemp] = useState(false);
const longLeftClick = (event) => {
    console.log('long left click occurred')
    setTemp((prevTemp) => (!prevTemp))
}*/



