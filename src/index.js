import { DataArr, FormFields, DomElements } from "./modules/todo-objects.js";

const PageElements = (() => {
    const addNewCategory = () => {
        const projectForm = document.querySelector("#projects-form");
        projectForm.addEventListener("submit", function(e) {
            e.preventDefault();
            if (DataArr.checkNewCategoryAdded(FormFields.getCategoryName())) {
                FormFields.newCategoryHandler(); // append to array
                DomElements.appendCategoryDiv(); // add dom element
                DataArr.resetCategoryAdded();
            }
        });
    };
    
    const addNewTask = () => {        
        const taskForm = document.querySelector("#task-form");
        taskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            FormFields.newTaskHandler(e);
        });
    };

    return { addNewCategory, addNewTask };
})();

const RenderPage = (() => {
    PageElements.addNewCategory();
    PageElements.addNewTask();
})();