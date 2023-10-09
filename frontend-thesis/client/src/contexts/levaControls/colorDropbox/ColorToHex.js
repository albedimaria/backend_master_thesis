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
            return "#9ACD32";
        case "limegreen":
            return "#32CD32";
        case "green":
            return "#008000";
        case "seagreen":
            return "#2E8B57";
        case "aquamarine":
            return "#26fab0";
        case "lightblue":
            return "#00c3fa";
        case "steelblue":
            return "#01598c";
        case "blue":
            return "#0000FF";
        case "blueviolet":
            return "#8A2BE2";
        case "violet":
            return "#EE82EE";
        case "hotpink":
            return "#FF69B4";
        case "red":
            return "#FF0000";
        case "white":
            return "#FFFFFF"; // Added "white" with its hex value
        default:
            return "#FFFFFF"; // Return null for unknown colors
    }
}

