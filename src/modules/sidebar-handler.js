import { DomElements } from "./dom-elements.js";
import { TaskDom } from "./task-handler.js";

const SidebarHandler = (() => {
    let currentCategory = "default";

    const changeCategory = (newCategory) => {
        currentCategory = newCategory;
        console.log(newCategory);
    };

    const getTabName = () => {
        return currentCategory;
    };

    const setThisDivActive = (div) => {
        div.classList.add("active-div");
    };

    const resetActiveDiv = () => {
        const allDivs = document.querySelectorAll(".category");
        allDivs.forEach(div => {
            div.classList.remove("active-div");
        });
    }

    const tabHandler = () => {
        const expandedSidebar = document.querySelector(".expanded-sidebar");
        expandedSidebar.addEventListener("click", function(e) {
            if (e.target.classList.contains("category")) {
                resetActiveDiv();
                setThisDivActive(e.target);
                changeCategory(e.target.id);
                DomElements.clearContents();
                const newHeading = DomElements.createCategoryH1(getTabName());
                DomElements.appendH1(newHeading);
                TaskDom.createAllTaskDivs();
            };
        });
    };

    return { getTabName, setThisDivActive, tabHandler }
})();

export { SidebarHandler };