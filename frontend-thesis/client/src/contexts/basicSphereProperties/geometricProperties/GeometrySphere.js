import { useState } from "react";

const GeometrySphere = () => {

    const [sphereSegments, setSphereSegments] = useState(4);
    const [sphereSize, setSphereSize] = useState(0.3);

    return {
        sphereSize, setSphereSize,
        sphereSegments, setSphereSegments
    }
}

export default GeometrySphere

