// Handling storage arrays
const DataArr = (() => {
    let allCategories = ["default"];
	let allTasks = [];
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

    const pushNewTask = (task) => {
        allTasks.push(task);
    };

    return { pushNewCategory, pushNewTask, checkNewCategoryAdded, resetCategoryAdded,
        allCategories, allTasks };
})();

// Module to handle form fields
const FormFields = (() => {
    const getCategoryName = () => {
        return document.querySelector("input[name='categoryName']").value;
    }

    const newCategoryHandler = () => {
        DataArr.pushNewCategory(getCategoryName());
    };

	const createTaskObject = (e) => {
		// New object from form fields
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        return formProps;
    };

    const newTaskHandler = (e) => {
        DataArr.pushNewTask(createTaskObject(e));
    }

    return { getCategoryName, newCategoryHandler, newTaskHandler };
})();

export { DataArr, FormFields };
