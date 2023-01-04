// Handling storage arrays
const DataArr = (() => {
    let allCategories = ["default"];
	let allTasks = [];

	const pushNewCategory = (category) => {
		allCategories.push(category);
	};

    const pushNewTask = (task) => {
        allTasks.push(task);
    };

    return { pushNewCategory, pushNewTask, allCategories };
})();

// Module to get form fields
const FormFields = (() => {
    const addNewCategory = () => {
		const categoryName = document.querySelector("input[name='categoryName']");
		const submitCategory = document.querySelector("#add-new-category");

        submitCategory.addEventListener("click", function (e) {
            e.preventDefault();
			const newCategory = categoryName.value;
			if (!(newCategory in DataArr.allCategories)) {
				DataArr.pushNewCategory(newCategory);
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
