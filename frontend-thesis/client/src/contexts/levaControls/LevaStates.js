import { useState } from "react";

const LevaState = () => {

    const [decreaseState, setDecreaseState] = useState(false);


    return {
    decreaseState, setDecreaseState
    }
}

export default LevaState