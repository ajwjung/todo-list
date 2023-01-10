import { DataArr } from "./form-handler.js";
import { DomElements } from "./dom-elements.js";

const SidebarHandler = (() => {
    let currentCategory = "default";

    const changeCategory = (newCategory) => {
        currentCategory = newCategory;
        console.log(newCategory);
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
                changeCategory(e.target.id);
                DomElements.clearContents();
                // create h1 with the category name
                const newHeading = DomElements.createCategoryH1(getTabName());
                DomElements.appendH1(newHeading);
                // create divs for all tasks in this category

                const currentTab = getTabName();
                const currentCategoryTasks = DataArr.allTasks[currentTab];
                currentCategory.forEach(task => {
                    
                })
            }
        });
    };

    return { getTabName, tabHandler }
})();

export { SidebarHandler };