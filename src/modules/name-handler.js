// Handle category names
const NameHandler = (() => {
    const checkWhiteSpaceInName = (name) => {
        return /\s/g.test(name);
    };

    const checkHyphens = (name) => {
        return /\-/g.test(name);
    };

    const replaceHyphensWithSpaces = (name) => {
        if (checkHyphens(name)) {
            return name.replace("-", " ");
        } else {
            return name;
        }
    };

    const getHyphenatedName = (name) => {
        if (checkWhiteSpaceInName(name)) {
            return name.replace(/\s+/g, "-");
        } else {
            return name;
        };
    };

    const capitalizeFirstLetters = (name) => {
        let modifiedName = name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
        return modifiedName;
    };

    const makeNamePresentable = (name) => {
        const modifiedName = replaceHyphensWithSpaces(name);
        return capitalizeFirstLetters(modifiedName);
    }

    return { replaceHyphensWithSpaces, getHyphenatedName, capitalizeFirstLetters,
    makeNamePresentable }
})();

export { NameHandler };