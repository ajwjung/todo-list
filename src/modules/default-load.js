import { FormFields } from "./form-handler.js";
import { DomElements } from "./dom-elements.js";
import { SidebarHandler } from "./sidebar-handler.js";
import { TaskDom } from "./task-handler.js";
import { CategoryDom } from "./category-handler.js";
import { DataArr } from "./storage-arrays.js";
import { CategoryStorage, TaskStorage } from "./local-storage.js";

const DefaultLoad = (() => {
    const setDefault = () => {
        // If local storage not set up yet
        if (!(CategoryStorage.getCategories() && TaskStorage.getTasks())) {
            CategoryStorage.setCategories();
            TaskStorage.setTasks();
            SidebarHandler.setInitialCategory();
            
            const defaultH1 = DomElements.createCategoryH1("default");
            DomElements.appendH1(defaultH1);
            setDefaultActive();
        };
    };

    const loadSavedCategories = () => {
        const allCategories = CategoryStorage.getCategories();
        if (allCategories && allCategories.length > 1) {
            for (let i = 1; i < allCategories.length; i++) {
                CategoryDom.appendCategoryDiv(allCategories[i]);
                DomElements.addExistingOptions(allCategories[i]);
            };
            DomElements.clearContents();
            const defaultH1 = DomElements.createCategoryH1(SidebarHandler.getTabName());
            DomElements.appendH1(defaultH1);
            setOtherActive();
        };
    };

    const loadSavedTasks = () => {
        TaskDom.createAllTaskDivs();
    };

    const addNewCategory = () => {
        const projectForm = document.querySelector("#projects-form");
        projectForm.addEventListener("submit", function(e) {
            e.preventDefault();
            if (DataArr.checkNewCategoryAdded(FormFields.getCategoryName())) {
                FormFields.newCategoryHandler(); // append to array
                CategoryDom.appendCategoryDiv(CategoryDom.getNewCategory());
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

    // Default tab
    const setDefaultActive = () => {
        const defaultTab = document.getElementById("default");
        SidebarHandler.setThisDivActive(defaultTab);
    };

    // Change default tab
    const setOtherActive = () => {
        SidebarHandler.resetActiveDiv();
        const lastOpenedTab = document.getElementById(SidebarHandler.getTabName());
        SidebarHandler.setThisDivActive(lastOpenedTab);
    };

    return { setDefault, loadSavedCategories, loadSavedTasks, 
        addNewCategory, addNewTask, setDefaultActive };
})();

export { DefaultLoad };