import { FormFields } from "./form-handler.js";
import { NameHandler } from "./name-handler.js";
import { DataArr } from "./storage-arrays.js";

const CategoryStorage = (() => {
    const setCategories = () => {
        localStorage.setItem("allCategories", JSON.stringify(["default"]));
    };

    const getCategories = () => {
        return JSON.parse(localStorage.getItem("allCategories"));
    };

    const updateCategoryArr = (updatedArr) => {
        localStorage.setItem("allCategories", JSON.stringify(updatedArr));
    };

    const pushCategory = (category) => {
        const allCategories = getCategories();
        allCategories.push(category);
        updateCategoryArr(allCategories);
    };

    return { setCategories, getCategories, pushCategory };
})();

const TaskStorage = (() => {
    const setTasks = () => {
        localStorage.setItem("allTasks", JSON.stringify({ "default": [] }));
    };

    const getTasks = () => {
        return JSON.parse(localStorage.getItem("allTasks"));
    };
    
    const pushTask = (taskStatus) => {
        const allTasks = getTasks();
        let task;
        if (taskStatus == "new task") {
            task = FormFields.TodoTask("new task");
        } else if (taskStatus == "edit task") {
            task = FormFields.TodoTask("edit task");
            DataArr.setUpdatedTaskVariable(task);
        };
        
        allTasks[task.category].push(task);
        updateTaskArr(allTasks);
    };

    const removeTask = (categoryName, arrayWithoutTask) => {
        const allTasks = getTasks();
        allTasks[categoryName] = arrayWithoutTask;
        updateTaskArr(allTasks);
    };

    const updateTaskArr = (updatedArr) => {
        localStorage.setItem("allTasks", JSON.stringify(updatedArr));
    };

    const addCategoryToObject = (category) => {
        // Creates new key in allTasks object
        const allTasks = getTasks();
        allTasks[NameHandler.getHyphenatedName(category)] = [];
        updateTaskArr(allTasks);
    };

    return { setTasks, getTasks, pushTask, 
        removeTask, updateTaskArr, addCategoryToObject };
})();

export { CategoryStorage, TaskStorage };