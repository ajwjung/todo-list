import { NameHandler } from "./name-handler.js";
import { FormFields } from "./form-handler.js";
import { CategoryStorage, TaskStorage } from "./local-storage.js";

// Handling storage arrays
const DataArr = (() => {
    let categoryAdded = false;
    let updatedTask;
    
    const checkNewCategoryAdded = (categoryName) => {
        const name = NameHandler.getHyphenatedName(categoryName).toLowerCase();
        if (!(CategoryStorage.getCategories().includes(name))) {
            categoryAdded = true;
        };

        return categoryAdded;
    };

    const resetCategoryAdded = () => {
        categoryAdded = false;
    };

	const pushNewCategory = (category) => {
        CategoryStorage.pushCategory(NameHandler.getHyphenatedName(category));
	};

    const checkTaskHasCategory = (category) => {
        return (TaskStorage.getTasks().hasOwnProperty(category));
    };

    const updateTaskVariable = (newTask) => {
        updatedTask = newTask;
    };

    const getUpdatedTask = () => {
        return updatedTask;
    };

    // const updateArrWithoutTask = (category, arr) => {
    //     const allTasks = TaskStorage.getTasks();
    //     allTasks[category] = arr;
    //     localStorage.setItem("allTasks", JSON.stringify(allTasks));
    // };

    const getRelevantTasks = (category) => {
        return TaskStorage.getTasks()[category];
    }

    return { checkNewCategoryAdded, resetCategoryAdded, pushNewCategory,
        checkTaskHasCategory, updateTaskVariable, 
        getUpdatedTask, getRelevantTasks };
})();

export { DataArr };