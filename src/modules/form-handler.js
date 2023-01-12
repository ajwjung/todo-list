import { DataArr } from "./storage-arrays.js";

// Module to handle form fields
const FormFields = (() => {
    const getCategoryName = () => {
        return document.querySelector("input[name='categoryName']").value;
    };

    const newCategoryHandler = () => {
        const newCategoryName = getCategoryName();
        if (!(DataArr.checkTaskHasCategory(newCategoryName))) {
            DataArr.addCategoryToObject(newCategoryName);
        };
        DataArr.pushNewCategory(newCategoryName);
    };

    const TodoTask = () => {
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const notes = document.getElementById("task-notes").value;
        const dueDate = document.getElementById("task-due-date").value;
        const priority = document.getElementById("priority-level").value;
        const category = document.getElementById("task-category").value;
    
        return { title, description, notes, dueDate, priority, category }
    };

    const getTaskObject = () => {
        return TodoTask();
    };

    const newTaskHandler = (e) => {
        DataArr.pushNewTask(TodoTask(e));
    };

    return { getCategoryName, newCategoryHandler, TodoTask,
        getTaskObject, newTaskHandler };
})();

export { FormFields };
