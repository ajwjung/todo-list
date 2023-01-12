import { FormFields } from "./modules/form-handler.js";
import { DomElements } from "./modules/dom-elements.js";
import { SidebarHandler } from "./modules/sidebar-handler.js";
import { TaskDom, TaskRemoval } from "./modules/task-handler.js";
import { CategoryDom } from "./modules/category-handler.js";
import { DataArr } from "./modules/storage-arrays.js";

const DefaultLoad = (() => {
    const addNewCategory = () => {
        const projectForm = document.querySelector("#projects-form");
        projectForm.addEventListener("submit", function(e) {
            e.preventDefault();
            if (DataArr.checkNewCategoryAdded(FormFields.getCategoryName())) {
                FormFields.newCategoryHandler(); // append to array
                CategoryDom.appendCategoryDiv(); // add dom element
                DomElements.addOptionsToSelect(); // add new option to select
                projectForm.reset();
                DataArr.resetCategoryAdded();
            }
        });
    };
    
    const addNewTask = () => {        
        const taskForm = document.querySelector("#task-form");
        taskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            FormFields.newTaskHandler(e);
            const currentTab = SidebarHandler.getTabName();
            const newTask = FormFields.getTaskObject();
            if (newTask.category == currentTab) {
                TaskDom.appendTaskDiv(newTask);
            };
            taskForm.reset();
        });
    };

    const setDefaultActive = () => {
        const defaultTab = document.getElementById("default");
        SidebarHandler.setThisDivActive(defaultTab);
    };

    return { addNewCategory, addNewTask, setDefaultActive };
})();

const RenderPage = (() => {
    const datePicker = document.querySelector("#task-due-date");
    datePicker.min = new Date().toISOString().split("T")[0];

    DefaultLoad.setDefaultActive();

    DomElements.expandCollapseTabs(".sidebar", ".expanded-sidebar");
    DomElements.expandCollapseTabs("#add-new-task", ".task-form-container");

    const defaultH1 = DomElements.createCategoryH1(SidebarHandler.getTabName());
    DomElements.appendH1(defaultH1);

    DefaultLoad.addNewCategory();
    DefaultLoad.addNewTask();

    SidebarHandler.tabHandler();
    TaskRemoval.removeTaskHandler();

})();