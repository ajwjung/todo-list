// Handling storage arrays
const DataArr = (() => {
    let allCategories = ["default"];
	let allTasks = [];
    
    const checkNewCategoryAdded = (categoryName) => {
        return (categoryName && !(allCategories.includes(categoryName)));
    }

	const pushNewCategory = (category) => {
		allCategories.push(category);
	};

    const pushNewTask = (task) => {
        allTasks.push(task);
    };

    return { pushNewCategory, pushNewTask, checkNewCategoryAdded,
        allCategories, allTasks };
})();

// Module to get form fields
const FormFields = (() => {
    const categoryName = document.querySelector("input[name='categoryName']");
    const submitCategory = document.querySelector("#add-new-category");
    
    const addNewCategory = () => {
        submitCategory.addEventListener("click", function (e) {
            e.preventDefault();
			if (DataArr.checkNewCategoryAdded(categoryName.value)) {
				DataArr.pushNewCategory(categoryName.value);
			}
        })
    }

	const handleSubmit = (e) => {
        e.preventDefault();
		// Create new object from form fields
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        DataArr.pushNewTask(formProps);
    }

    const addNewTask = () => {        
        const taskForm = document.querySelector("#task-form");
        taskForm.addEventListener("submit", handleSubmit);
    }

    return { addNewCategory, addNewTask };
})();

export { FormFields };
