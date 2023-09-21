// Name based on displayed 3 features or real name

const getNameToShow = (sphere, features, showSelected) => {
    return showSelected ? sphere.name : features;
};

export default getNameToShow

