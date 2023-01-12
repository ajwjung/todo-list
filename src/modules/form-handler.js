import { NameHandler } from "./name-handler.js";

// Handling storage arrays
const DataArr = (() => {
    let allCategories = ["default"];
	let allTasks = { "default": [] };
    let categoryAdded = false;
    
    const checkNewCategoryAdded = (categoryName) => {
        const name = NameHandler.getHyphenatedName(categoryName).toLowerCase();
        if (!(allCategories.includes(name))) {
            categoryAdded = true;
        }
        return categoryAdded;
    };

    const resetCategoryAdded = () => {
        categoryAdded = false;
    };

	const pushNewCategory = (category) => {
		allCategories.push(NameHandler.getHyphenatedName(category));
	};

    const checkTaskHasCategory = (category) => {
        return (allTasks.hasOwnProperty(category));
    };

    const addCategoryToObject = (category) => {
        // Creates new key in allTasks object
        allTasks[NameHandler.getHyphenatedName(category)] = [];
    };

    const pushNewTask = () => {
        const newTask = FormFields.TodoTask();
        allTasks[newTask.category].push(newTask);
    };

    const updateArr = (category, arr) => {
        allTasks[category] = arr;
    };

    return { checkNewCategoryAdded, resetCategoryAdded, pushNewCategory,
        checkTaskHasCategory, addCategoryToObject, pushNewTask,
        updateArr, allCategories, allTasks };
})();

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

export { DataArr, FormFields };
