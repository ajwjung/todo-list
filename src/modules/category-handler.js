import { NameHandler } from "./name-handler.js";
import { CategoryStorage } from "./local-storage.js";

// Handles dom for category only
const CategoryDom = (() => {
    const getNewCategory = () => {
        const allCategories = CategoryStorage.getCategories();
        return allCategories[allCategories.length - 1];
    };

    const createCategoryDiv = (category) => {
        const newCategoryDiv = document.createElement("div");
        newCategoryDiv.setAttribute("id", category);
        newCategoryDiv.classList.add("category");
        newCategoryDiv.textContent = NameHandler.makeNamePresentable(category);
        return newCategoryDiv;
    };

    const appendCategoryDiv = (category) => {
        const sidebarDropdown = document.querySelector(".expanded-sidebar");
        const newDiv = createCategoryDiv(category);
        sidebarDropdown.insertBefore(newDiv, sidebarDropdown.lastElementChild);
    };

    return { getNewCategory, createCategoryDiv, appendCategoryDiv };
})();

export { CategoryDom };