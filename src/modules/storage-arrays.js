import { NameHandler } from "./name-handler.js";
import { FormFields } from "./form-handler.js";
import { CategoryStorage, TaskStorage } from "./local-storage.js";

// Handling storage arrays
const DataArr = (() => {
    let allCategories = CategoryStorage.getCategories();
    let allTasks = TaskStorage.getTasks();
    let categoryAdded = false;
    let updatedTask;
    
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
        CategoryStorage.pushCategory(NameHandler.getHyphenatedName(category));
	};

    const checkTaskHasCategory = (category) => {
        return (allTasks.hasOwnProperty(category));
    };

    const updateTaskVariable = (newTask) => {
        updatedTask = newTask;
    };

    const getUpdatedTask = () => {
        return updatedTask;
    };

    const updateArr = (category, arr) => {
        allTasks[category] = arr;
        console.log(allTasks);
    };

    const getRelevantTasks = (category) => {
        return allTasks[category];
    }

    return { checkNewCategoryAdded, resetCategoryAdded, pushNewCategory,
        checkTaskHasCategory, updateTaskVariable, 
        updateArr, getUpdatedTask, getRelevantTasks, allCategories, allTasks };
})();

export { DataArr };