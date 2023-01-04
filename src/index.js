import { DataArr, FormFields, DomElements } from "./modules/todo-objects.js";

const PageElements = (() => {
    const addCategoryToSidebar = () => {
        if (DataArr.categoryAdded) {
            DomElements.appendCategoryDiv();
        }
    };

    const addNewCategory = () => {
        const submitCategory = document.querySelector("#add-new-category");
        submitCategory.addEventListener("click", function(e) {
            e.preventDefault();
            FormFields.newCategoryHandler(); // append to array
            DomElements.appendCategoryDiv();
        });
    };
    
    const addNewTask = () => {        
        const taskForm = document.querySelector("#task-form");
        taskForm.addEventListener("submit", FormFields.createTaskObject);
    };

    return { addNewCategory, addNewTask };
})();

const RenderPage = (() => {
    PageElements.addNewCategory();
    PageElements.addNewTask();
})();