import { NameHandler } from "./name-handler.js";
import { FormFields } from "./form-handler.js";

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

export { DataArr };