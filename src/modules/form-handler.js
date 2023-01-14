import { DataArr } from "./storage-arrays.js";
import { TaskStorage } from "./local-storage.js";

// Module to handle form fields
const FormFields = (() => {
    const getCategoryName = () => {
        return document.querySelector("input[name='categoryName']").value;
    };

    const newCategoryHandler = () => {
        const newCategoryName = getCategoryName();
        if (!(DataArr.checkTaskHasCategory(newCategoryName))) {
            TaskStorage.addCategoryToObject(newCategoryName);
        };
        DataArr.pushNewCategory(newCategoryName);
    };

    const TodoTask = (taskIndicator) => {
        let title, description, notes, dueDate, priority, category;

        if (taskIndicator == "new task") {
            title = document.getElementById("task-title").value;
            description = document.getElementById("task-description").value;
            notes = document.getElementById("task-notes").value;
            dueDate = document.getElementById("task-due-date").value;
            priority = document.getElementById("priority-level").value;
            category = document.getElementById("task-category").value;
        } else if (taskIndicator == "edit task") {
            title = document.getElementById("edit-task-title").value;
            description = document.getElementById("edit-task-description").value;
            notes = document.getElementById("edit-task-notes").value;
            dueDate = document.getElementById("edit-task-due-date").value;
            priority = document.getElementById("edit-priority-level").value;
            category = document.getElementById("edit-task-category").value;
        }

        return { title, description, notes, dueDate, priority, category }
    };

    const getTaskObject = (taskIndicator) => {
        return TodoTask(taskIndicator);
    };

    const newTaskHandler = () => {
        TaskStorage.pushTask("new task");
    };

    return { getCategoryName, newCategoryHandler, TodoTask,
        getTaskObject, newTaskHandler };
})();

export { FormFields };
