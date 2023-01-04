// Handling storage arrays
const DataArr = (() => {
    let allCategories = ["default"];
	let allTasks = [];
    let categoryAdded = false;
    
    const checkNewCategoryAdded = (categoryName) => {
        const name = categoryName.toLowerCase();
        if (name && !(allCategories.includes(name))) {
            categoryAdded = true;
        }
        return categoryAdded;
    }

    const resetCategoryAdded = () => {
        categoryAdded = false;
    }

	const pushNewCategory = (category) => {
		allCategories.push(category);
	};

    const pushNewTask = (task) => {
        allTasks.push(task);
    };

    return { pushNewCategory, pushNewTask, checkNewCategoryAdded, resetCategoryAdded,
        allCategories, allTasks, categoryAdded };
})();

// Module to get form fields
const FormFields = (() => {
    const newCategoryHandler = () => {
        const categoryName = document.querySelector("input[name='categoryName']");

        if (DataArr.checkNewCategoryAdded(categoryName.value)) {
            DataArr.pushNewCategory(categoryName.value);
            DataArr.resetCategoryAdded();
        }
    };

	const createTaskObject = (e) => {
        e.preventDefault();
		// Create new object from form fields
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        DataArr.pushNewTask(formProps);
    };

    return { newCategoryHandler, createTaskObject };
})();

// Module to create dom elements
const DomElements = (() => {
    const getNewCategory = () => {
        return DataArr.allCategories[DataArr.allCategories.length - 1];
    };

    const createCategoryDiv = (category) => {
        const newCategoryDiv = document.createElement("div");
        newCategoryDiv.classList.add(category);
        newCategoryDiv.textContent = category;

        return newCategoryDiv;
    };

    // Create new div and append to sidebar
    const appendCategoryDiv = () => {
        const sidebarDropdown = document.querySelector(".expanded-sidebar");
        const newDiv = createCategoryDiv(getNewCategory());
        console.log("This is working");
        sidebarDropdown.appendChild(newDiv);
    };

    return { appendCategoryDiv }

})();

export { DataArr, FormFields, DomElements };
