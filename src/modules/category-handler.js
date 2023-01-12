import { DataArr } from "./storage-arrays.js";
import { NameHandler } from "./name-handler.js";

// Handles dom for category only
const CategoryDom = (() => {
    const getNewCategory = () => {
        return DataArr.allCategories[DataArr.allCategories.length - 1];
    };

    const createCategoryDiv = (category) => {
        const newCategoryDiv = document.createElement("div");
        newCategoryDiv.setAttribute("id", category);
        newCategoryDiv.classList.add("category");
        newCategoryDiv.textContent = NameHandler.makeNamePresentable(category);
        return newCategoryDiv;
    };

    const appendCategoryDiv = () => {
        const sidebarDropdown = document.querySelector(".expanded-sidebar");
        const newDiv = createCategoryDiv(getNewCategory());
        sidebarDropdown.insertBefore(newDiv, sidebarDropdown.lastElementChild);
    };

    return { getNewCategory, appendCategoryDiv };
})();

export { CategoryDom };