/*

    // OVERLAPPING
    const isOverlapping = (i) => {
        const [positionX1, positionY1, positionZ1] = calculatePosition(i);

        for (let j = 0; j < numSpheres; j++) {
            if (i !== j) {
                const [positionX2, positionY2, positionZ2] = calculatePosition(j);
                const distance = Math.sqrt(
                    Math.pow(positionX2 - positionX1, 2) +
                    Math.pow(positionY2 - positionY1, 2) +
                    Math.pow(positionZ2 - positionZ1, 2)
                );

                if (distance < sphereSize) {
                    return true; // Spheres are overlapping
                }
            }
        }

        return false; // Spheres are not overlapping
    };


    // useEffect for checking overlapping spheres

    useEffect(() => {
        // Check for overlapping spheres
        const checkOverlap = () => {
            for (let i = 0; i < numSpheres; i++) {
                if (isOverlapping(i)) {
                    // console.log(`Sphere ${i} is overlapping`);
                    decreaseSize()
                }
                /!* else
                     console.log(`no overlapping`)*!/
            }
        };

        checkOverlap()
    }, [numSpheres, selectedOptionX, selectedOptionY, selectedOptionZ]);

*/