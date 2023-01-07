import { NameHandler } from "./name-handler.js";
import { DataArr, FormFields } from "./form-handler.js";

// Handles dom for category only
const CategoryDom = (() => {
    const getNewCategory = () => {
        return DataArr.allCategories[DataArr.allCategories.length - 1];
    };

    const createCategoryDiv = (category) => {
        const newCategoryDiv = document.createElement("div");
        newCategoryDiv.setAttribute("id", category);
        newCategoryDiv.classList.add("category");
        newCategoryDiv.textContent = NameHandler.makeNamePresentable(category);
        return newCategoryDiv;
    };

    const appendCategoryDiv = () => {
        const sidebarDropdown = document.querySelector(".expanded-sidebar");
        const newDiv = createCategoryDiv(getNewCategory());
        sidebarDropdown.insertBefore(newDiv, sidebarDropdown.lastElementChild);
    };

    return { getNewCategory, appendCategoryDiv };
})();

// Handles creating dom elements
const DomElements = (() => {
    const addOptionsToSelect = () => {
        const categorySelect = document.getElementById("task-category");
        const category = CategoryDom.getNewCategory();
        categorySelect.add(new Option(NameHandler.makeNamePresentable(category), category))
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

    return { addOptionsToSelect, createDiv, createPara }

})();

// Handles dom for tasks only
const TaskDom = (() => {
    const createOverviewDiv = (taskObj) => {
        const newTaskDiv = DomElements.createDiv("task-overview");
        const priorityIndicator = DomElements.createDiv("priority-indicator", taskObj.priority);
        const checkbox = DomElements.createDiv("checkbox");
        const titlePara = DomElements.createPara("title", taskObj.title);
        const descriptionPara = DomElements.createPara("description", taskObj.description);

        newTaskDiv.appendChild(priorityIndicator);
        newTaskDiv.appendChild(checkbox);
        newTaskDiv.appendChild(titlePara);
        newTaskDiv.appendChild(descriptionPara);

        return newTaskDiv;
    };

    const createTaskDiv = (taskObj) => {
        const taskContainer = DomElements.createDiv("task-container");
        const taskOverview = createOverviewDiv(taskObj);
        const taskDate = DomElements.createPara("task-date", taskObj.dueDate);
        taskContainer.appendChild(taskOverview);
        taskContainer.appendChild(taskDate);

        return taskContainer;
    };

    const appendTaskDiv = () => {
        const containerHeader = document.querySelector("#project-name");
        const newTaskDiv = createTaskDiv(FormFields.getTaskObject());
        containerHeader.parentNode.insertBefore(newTaskDiv, containerHeader.nextElementSibling);

    };

    const expandCollapseTabs = (boxName, hiddenBoxName) => {
        const visibleBox = document.querySelector(boxName);
        const hiddenBox = document.querySelector(hiddenBoxName);
        visibleBox.addEventListener("click", function(e) {
            hiddenBox.classList.toggle("hidden");
        });
    }

    return { appendTaskDiv, expandCollapseTabs }

})();

export { CategoryDom, DomElements, TaskDom };