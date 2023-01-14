import { DomElements } from "./dom-elements.js";
import { TaskDom } from "./task-handler.js";

const SidebarHandler = (() => {
    const setInitialCategory = () => {
        localStorage.setItem("currentCategory", "default");
    };

    const changeCategory = (newCategory) => {
        localStorage.setItem("currentCategory", newCategory);
    };

    const getTabName = () => {
        return localStorage.getItem("currentCategory");
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

    return { setInitialCategory, getTabName, resetActiveDiv, 
        setThisDivActive, tabHandler }
})();

export { SidebarHandler };