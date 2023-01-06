import { DataArr, FormFields, DomElements } from "./modules/todo-objects.js";

const PageElements = (() => {
    const addNewCategory = () => {
        const projectForm = document.querySelector("#projects-form");
        projectForm.addEventListener("submit", function(e) {
            e.preventDefault();
            if (DataArr.checkNewCategoryAdded(FormFields.getCategoryName())) {
                FormFields.newCategoryHandler(); // append to array
                DomElements.appendCategoryDiv(); // add dom element
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
            DomElements.appendTaskDiv();
        });
    };

    return { addNewCategory, addNewTask };
})();

const RenderPage = (() => {
    const datePicker = document.querySelector("#task-due-date");
    datePicker.min = new Date().toISOString().split("T")[0];

    DomElements.expandCollapseTabs(".sidebar", ".expanded-sidebar");
    DomElements.expandCollapseTabs("#add-new-task", ".task-form-container");
    PageElements.addNewCategory();
    PageElements.addNewTask();
})();