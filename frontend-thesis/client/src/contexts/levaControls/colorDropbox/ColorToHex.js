export function colorToHex(colorName) {
    switch (colorName.toLowerCase()) {
        case "orangered":
            return "#FF4500";
        case "orange":
            return "#ffa200";
        case "gold":
            return "#ffda00";
        case "yellow":
            return "#ffff00";
        case "yellowgreen":
            return "#af0";
        case "limegreen":
            return "#0f0";
        case "green":
            return "#008000";
        case "seagreen":
            return "#00ff6f";
        case "aquamarine":
            return "#00ffb7";
        case "lightblue":
            return "#00c8ff";
        case "steelblue":
            return "#0091ff";
        case "blue":
            return "#0000FF";
        case "blueviolet":
            return "#5e00ff";
        case "violet":
            return "#d0f";
        case "hotpink":
            return "#ff00c8";
        case "red":
            return "#FF0000";
        case "white":
            return "#FFFFFF"; // Added "white" with its hex value
        default:
            return "#FFFFFF"; // Return null for unknown colors
    }
}

