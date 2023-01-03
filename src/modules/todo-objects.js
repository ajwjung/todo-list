// Factory to create objects
const TodoTask = (title, description, notes, dueDate, priority) => {
	
    return { title, description, notes, dueDate, priority };
};

const DataArr = (() => {
    let allCategories = ["default"];

	const pushNewCategory = (category) => {
		allCategories.push(category);
	}

	return { pushNewCategory };
})();

const FormFields = (() => {

    const addNewCategory = () => {
		const categoryName = document.querySelector("input[name='categoryName']");
		const submitCategory = document.querySelector("#add-new-category");

        submitCategory.addEventListener("click", function (e) {
            e.preventDefault();
			const newCategory = categoryName.value;
			if (!(newCategory in DataArr.allCategories)) {
				DataArr.addNewCategory(newCategory);
			}
        })
    }

    return { addNewCategory };
})();

export { FormFields };
