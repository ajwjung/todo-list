import { DataArr, FormFields } from "./modules/form-handler.js";
import { CategoryDom, DomElements, TaskDom } from "./modules/dom-elements.js";
import { SidebarHandler } from "./modules/sidebar-handler.js";
import { NameHandler } from "./modules/name-handler.js";

const PageElements = (() => {
    const addNewCategory = () => {
        const projectForm = document.querySelector("#projects-form");
        projectForm.addEventListener("submit", function(e) {
            e.preventDefault();
            if (DataArr.checkNewCategoryAdded(FormFields.getCategoryName())) {
                FormFields.newCategoryHandler(); // append to array
                CategoryDom.appendCategoryDiv(); // add dom element
                DomElements.addOptionsToSelect(); // add new option to select
                DataArr.resetCategoryAdded();
            }
        });
    };
    
    const addNewTask = () => {        
        const taskForm = document.querySelector("#task-form");
        taskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            FormFields.newTaskHandler(e);
            TaskDom.appendTaskDiv();
        });
    };

    return { addNewCategory, addNewTask };
})();

const RenderPage = (() => {
    const datePicker = document.querySelector("#task-due-date");
    datePicker.min = new Date().toISOString().split("T")[0];

    TaskDom.expandCollapseTabs(".sidebar", ".expanded-sidebar");
    TaskDom.expandCollapseTabs("#add-new-task", ".task-form-container");

    const defaultH1 = DomElements.createCategoryH1(SidebarHandler.getTabName());
    DomElements.appendH1(defaultH1);

    PageElements.addNewCategory();
    PageElements.addNewTask();

    SidebarHandler.tabHandler();
})();