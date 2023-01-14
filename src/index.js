import { FormFields } from "./modules/form-handler.js";
import { DomElements } from "./modules/dom-elements.js";
import { SidebarHandler } from "./modules/sidebar-handler.js";
import { TaskDom, TaskRemoval } from "./modules/task-handler.js";
import { CategoryDom } from "./modules/category-handler.js";
import { DataArr } from "./modules/storage-arrays.js";
import { TaskEditor } from "./modules/task-editor.js";
import { CategoryStorage, TaskStorage } from "./modules/local-storage.js";

const DefaultLoad = (() => {
    const setDefault = () => {
        // If local storage not set up yet
        if (!(CategoryStorage.getCategories() && TaskStorage.getTasks())) {
            CategoryStorage.setCategories();
            TaskStorage.setTasks();
            SidebarHandler.setInitialCategory();
            setDefaultActive();
        };
    };

    const loadCategories = () => {
        const allCategories = CategoryStorage.getCategories();
        if (allCategories && allCategories.length > 1) {
            for (let i = 1; i < allCategories.length; i++) {
                CategoryDom.appendCategoryDiv(allCategories[i]);
                DomElements.addExistingOptions(allCategories[i]);
            };
            setOtherActive();
        };
    };

    const addNewCategory = () => {
        const projectForm = document.querySelector("#projects-form");
        projectForm.addEventListener("submit", function(e) {
            e.preventDefault();
            if (DataArr.checkNewCategoryAdded(FormFields.getCategoryName())) {
                FormFields.newCategoryHandler(); // append to array
                CategoryDom.appendCategoryDiv(CategoryDom.getNewCategory()); // add dom element
                DomElements.addNewOptionToSelect(CategoryDom.getNewCategory()); 
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
            const newTask = FormFields.getTaskObject("new task");
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

    const setOtherActive = () => {
        SidebarHandler.resetActiveDiv();
        const lastOpenedTab = document.getElementById(SidebarHandler.getTabName());
        SidebarHandler.setThisDivActive(lastOpenedTab);
    };

    return { setDefault, loadCategories, addNewCategory, addNewTask, setDefaultActive };
})();

const RenderPage = (() => {
    const datePicker = document.querySelector("#task-due-date");
    datePicker.min = new Date().toISOString().split("T")[0];

    DefaultLoad.setDefault();
    DefaultLoad.loadCategories();

    DomElements.expandCollapseTabs(".sidebar", ".expanded-sidebar");
    DomElements.expandCollapseTabs("#add-new-task", ".task-form-container");

    const defaultH1 = DomElements.createCategoryH1(SidebarHandler.getTabName());
    DomElements.appendH1(defaultH1);

    DefaultLoad.addNewCategory();
    DefaultLoad.addNewTask();

    SidebarHandler.tabHandler();
    TaskRemoval.removeTaskHandler();
    TaskEditor.editTaskHandler();

})();