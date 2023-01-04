import { DataArr, FormFields, DomElements } from "./modules/todo-objects.js";

const PageElements = (() => {
    const addNewCategory = () => {
        const submitCategory = document.querySelector("#add-new-category");
        submitCategory.addEventListener("click", function(e) {
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
        taskForm.addEventListener("submit", FormFields.createTaskObject);
    };

    return { addNewCategory, addNewTask };
})();

const RenderPage = (() => {
    PageElements.addNewCategory();
    PageElements.addNewTask();
})();