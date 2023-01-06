// Handling storage arrays
const DataArr = (() => {
    let allCategories = ["default"];
	let allTasks = { "default": [] };
    let categoryAdded = false;
    
    const checkNewCategoryAdded = (categoryName) => {
        const name = categoryName.toLowerCase();
        if (!(allCategories.includes(name))) {
            categoryAdded = true;
        }
        return categoryAdded;
    }

    const resetCategoryAdded = () => {
        categoryAdded = false;
    }

	const pushNewCategory = (category) => {
		allCategories.push(category.toLowerCase());
	};

    const addCategoryToObject = (category) => {
        // Creates new key in allTasks object
        if (!(allTasks.hasOwnProperty(category))) {
            allTasks[category] = [];
        }
    };

    const pushNewTask = () => {
        const newTask = FormFields.TodoTask();
        allTasks[newTask.category].push(newTask);
    };

    return { checkNewCategoryAdded, resetCategoryAdded, pushNewCategory, 
        addCategoryToObject, pushNewTask, allCategories };
})();

// Module to handle form fields
const FormFields = (() => {
    const getCategoryName = () => {
        return document.querySelector("input[name='categoryName']").value;
    }

    const newCategoryHandler = () => {
        const newCategoryName = getCategoryName();
        DataArr.addCategoryToObject(newCategoryName);
        DataArr.pushNewCategory(newCategoryName);
    };

    const TodoTask = () => {
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const notes = document.getElementById("task-description").value;
        const dueDate = document.getElementById("task-due-date").value;
        const priority = document.getElementById("priority-level").value;
        const category = document.getElementById("task-category").value;
    
        return { title, description, notes, dueDate, priority, category }
    }

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
