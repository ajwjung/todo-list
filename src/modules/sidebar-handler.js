import { DomElements } from "./dom-elements.js";
import { NameHandler } from "./name-handler.js";

const SidebarHandler = (() => {
    let currentCategory = "default";
    let categoryClicked = false;

    const toggleClicked = () => {
        categoryClicked = true;
    };

    const resetClicked = () => {
        categoryClicked = false;
    }

    const changeCategory = (newCategory) => {
        if (categoryClicked) {
            currentCategory = newCategory;
            console.log(newCategory);
        }
    };

    const getTabName = () => {
        return currentCategory;
    };

    const tabHandler = () => {
        const expandedSidebar = document.querySelector(".expanded-sidebar");
        expandedSidebar.addEventListener("click", function(e) {
            if (e.target.classList.contains("category")) {
                // if any "category" div is clicked
                // erase all contents
                toggleClicked();
                changeCategory(e.target.id);
                DomElements.clearContents();
                // create h1 with the category name
                const newHeading = DomElements.createCategoryH1(getTabName());
                DomElements.appendH1(newHeading);
                // create divs for all tasks in this category

                resetClicked();
            }
        });
    };

    return { getTabName, tabHandler }
})();

export { SidebarHandler };