import { DomElements, TaskDom } from "./dom-elements.js";

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
                changeCategory(e.target.id);
                DomElements.clearContents();
                const newHeading = DomElements.createCategoryH1(getTabName());
                DomElements.appendH1(newHeading);
                TaskDom.createAllTaskDivs();
            };
        });
    };

    return { getTabName, tabHandler }
})();

export { SidebarHandler };