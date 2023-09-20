// Name based on displayed 3 features or real name

const getNameToShow = (sphere, features, showSelected) => {
    return showSelected ? features : sphere.name;
};

export default getNameToShow

