// Module to handle category names
const NameHandler = (() => {
    const checkWhiteSpaceInName = (name) => {
        return /\s/g.test(name);
    };

    const getNameWithoutWhiteSpaces = (name) => {
        if (checkWhiteSpaceInName(name)) {
            return name.replace(/\s+/g, "");
        } else {
            return name;
        }
    };

    const capitalizeFirstLetters = (name) => {
        let modifiedName = name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
        return modifiedName;
    }

    return { getNameWithoutWhiteSpaces, capitalizeFirstLetters }
})();

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
        allCategories, allTasks, categoryAdded };
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

// Module to create dom elements
const DomElements = (() => {
    const getNewCategory = () => {
        return DataArr.allCategories[DataArr.allCategories.length - 1];
    };

    const createCategoryDiv = (category) => {
        const newCategoryDiv = document.createElement("div");
        const nameWithoutWhiteSpace = NameHandler.getNameWithoutWhiteSpaces(category);
        newCategoryDiv.setAttribute("id", nameWithoutWhiteSpace);
        newCategoryDiv.classList.add("category");
        newCategoryDiv.textContent = NameHandler.capitalizeFirstLetters(category);
        return newCategoryDiv;
    };

    const appendCategoryDiv = () => {
        const sidebarDropdown = document.querySelector(".expanded-sidebar");
        const newDiv = createCategoryDiv(getNewCategory());
        sidebarDropdown.insertBefore(newDiv, sidebarDropdown.lastElementChild);
    };

    const addOptionsToSelect = () => {
        const categorySelect = document.getElementById("task-category");
        const category = getNewCategory();
        categorySelect.add(new Option(NameHandler.capitalizeFirstLetters(category), category))
    };

    const getNewTask = () => {
        return DataArr.allTasks[DataArr.allTasks.length - 1];
    };

    const createDiv = (className, anotherClassName) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add(className);
        if (anotherClassName) {
            newDiv.classList.add(anotherClassName);
        }

        return newDiv;
    };

    const createPara = (className, objValue) => {
        const newPara = document.createElement("p");
        newPara.classList.add(className);
        newPara.textContent = objValue;

        return newPara;
    };

    const createOverviewDiv = (taskObj) => {
        const newTaskDiv = createDiv("task-overview");
        const priorityIndicator = createDiv("priority-indicator", taskObj.taskPriority);
        const checkbox = createDiv("checkbox");
        const titlePara = createPara("title", taskObj.taskTitle);
        const descriptionPara = createPara("description", taskObj.taskDescription);

        newTaskDiv.appendChild(priorityIndicator);
        newTaskDiv.appendChild(checkbox);
        newTaskDiv.appendChild(titlePara);
        newTaskDiv.appendChild(descriptionPara);

        return newTaskDiv;
    };

    const createTaskDiv = (taskObj) => {
        const taskContainer = createDiv("task-container");
        const taskOverview = createOverviewDiv(taskObj);
        const taskDate = createPara("task-date", taskObj.taskDueDate);
        taskContainer.appendChild(taskOverview);
        taskContainer.appendChild(taskDate);

        return taskContainer;
    };

    const appendTaskDiv = () => {
        const containerHeader = document.querySelector("#project-name");
        const newTaskDiv = createTaskDiv(getNewTask());
        containerHeader.parentNode.insertBefore(newTaskDiv, containerHeader.nextElementSibling);

    };

    const expandCollapseTabs = (boxName, hiddenBoxName) => {
        const visibleBox = document.querySelector(boxName);
        const hiddenBox = document.querySelector(hiddenBoxName);
        visibleBox.addEventListener("click", function(e) {
            hiddenBox.classList.toggle("hidden");
        });
    }

    return { appendCategoryDiv, appendTaskDiv, addOptionsToSelect, expandCollapseTabs }

})();

export { DataArr, FormFields, DomElements };
