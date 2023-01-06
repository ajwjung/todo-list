// Handle category names
const NameHandler = (() => {
    const checkWhiteSpaceInName = (name) => {
        return /\s/g.test(name);
    };

    const getNameWithoutWhiteSpaces = (name) => {
        if (checkWhiteSpaceInName(name)) {
            return name.replace(/\s+/g, "");
        } else {
            return name;
        }
    };

    const capitalizeFirstLetters = (name) => {
        let modifiedName = name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
        return modifiedName;
    }

    return { getNameWithoutWhiteSpaces, capitalizeFirstLetters }
})();

export { NameHandler };