import { NameHandler } from "./name-handler.js";
import { DataArr } from "./form-handler.js";
import { SidebarHandler } from "./sidebar-handler.js";
import { TaskCards } from "./task-handler.js";

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
    const displayContainer = document.querySelector(".display-container");

    const addOptionsToSelect = () => {
        const categorySelect = document.getElementById("task-category");
        const category = CategoryDom.getNewCategory();
        categorySelect.add(new Option(NameHandler.makeNamePresentable(category), category))
    };

    const clearContents = () => {
        displayContainer.innerHTML = "";
    }

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

    const createCategoryH1 = (categoryName) => {
        const newH1 = document.createElement("h1");
        newH1.setAttribute("id", "category-name");
        newH1.textContent = NameHandler.makeNamePresentable(categoryName);

        return newH1;
    };

    const appendH1 = (heading) => {
        displayContainer.appendChild(heading);
    }

    return { addOptionsToSelect, clearContents, createDiv,
        createPara, createCategoryH1, appendH1 }

})();

// Handles dom for tasks only
const TaskDom = (() => {
    const createOverviewDiv = (taskObj) => {
        const newTaskDiv = DomElements.createDiv("task-overview");
        const priorityIndicator = DomElements.createDiv("priority-indicator", taskObj.priority);
        const checkbox = DomElements.createDiv("checkbox");
        const titlePara = DomElements.createPara("title", taskObj.title);
        const descriptionPara = DomElements.createPara("description", taskObj.description);
        const taskDate = DomElements.createPara("task-date", taskObj.dueDate);

        newTaskDiv.appendChild(priorityIndicator);
        newTaskDiv.appendChild(checkbox);
        newTaskDiv.appendChild(titlePara);
        newTaskDiv.appendChild(descriptionPara);
        newTaskDiv.appendChild(taskDate);

        return newTaskDiv;
    };

    const createTaskDiv = (taskObj) => {
        const taskContainer = DomElements.createDiv("task-container");
        const taskOverview = createOverviewDiv(taskObj);
        taskContainer.appendChild(taskOverview);

        return taskContainer;
    };

    const createTaskDetails = (taskObj) => {
        const detailsContainer = DomElements.createDiv("task-details");
        const taskNotes = DomElements.createPara("task-notes", taskObj.notes);
        detailsContainer.appendChild(taskNotes);
        
        return detailsContainer;
    };

    const appendTaskDiv = (taskObj) => {
        const displayContainer = document.querySelector(".display-container");
        const newTaskDiv = createTaskDiv(taskObj);

        TaskCards.expandTask(newTaskDiv, taskObj);
        
        displayContainer.appendChild(newTaskDiv);
    };

    const createAllTaskDivs = () => {
        const currentTab = SidebarHandler.getTabName();
        const currentCategoryTasks = DataArr.allTasks[currentTab];
        currentCategoryTasks.forEach(task => {
            appendTaskDiv(task);
        });
    };

    const expandCollapseTabs = (boxName, hiddenBoxName) => {
        const visibleBox = document.querySelector(boxName);
        const hiddenBox = document.querySelector(hiddenBoxName);
        visibleBox.addEventListener("click", function(e) {
            hiddenBox.classList.toggle("hidden");
        });
    }

    return { createTaskDetails, appendTaskDiv, createAllTaskDivs, expandCollapseTabs }

})();

export { CategoryDom, DomElements, TaskDom };