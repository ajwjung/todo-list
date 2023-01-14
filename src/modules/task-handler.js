import { DomElements } from "./dom-elements.js";
import { DataArr } from "./storage-arrays.js";
import { NameHandler } from "./name-handler.js";
import { SidebarHandler } from "./sidebar-handler.js";
import { TaskEditor } from "./task-editor.js";
import { TaskStorage } from "./local-storage.js";

// Handles dom for tasks
const TaskDom = (() => {
    const createOverviewDiv = (taskObj) => {
        const newTaskDiv = DomElements.createDiv("task-overview", "strikethrough");
        const priorityIndicator = DomElements.createDiv("priority-indicator", taskObj.priority);
        const checkbox = DomElements.createDiv("checkbox", "unchecked");
        const titlePara = DomElements.createPara("title", taskObj.title);
        const descriptionPara = DomElements.createPara("description", taskObj.description);
        const taskDate = DomElements.createPara("task-date", taskObj.dueDate);
        const viewTaskDetailsBtn = DomElements.createViewBtn();
        const editTaskBtn = DomElements.createEditBtn();
        const deleteTaskBtn = DomElements.createDeleteBtn();

        newTaskDiv.appendChild(priorityIndicator);
        newTaskDiv.appendChild(checkbox);
        newTaskDiv.appendChild(titlePara);
        newTaskDiv.appendChild(descriptionPara);
        newTaskDiv.appendChild(taskDate);
        newTaskDiv.appendChild(viewTaskDetailsBtn);
        newTaskDiv.appendChild(editTaskBtn);
        newTaskDiv.appendChild(deleteTaskBtn);

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

    const toggleCheckbox = (box) => {
        box.addEventListener("click", function(e) {
            box.parentNode.classList.toggle("strikethrough");
            box.classList.toggle("unchecked");
        });
    };

    const toggleViewDetails = (icon) => {
        icon.classList.toggle("hide-details");
    }

    const appendTaskDiv = (taskObj) => {
        const displayContainer = document.querySelector(".display-container");
        const newTaskDiv = createTaskDiv(taskObj);
        const viewDetailsBtn = newTaskDiv.querySelector(".view-details");
        const taskCheckbox = newTaskDiv.querySelector(".checkbox");

        toggleCheckbox(taskCheckbox);
        TaskExpansion.expandDiv(viewDetailsBtn, newTaskDiv, taskObj);
        displayContainer.appendChild(newTaskDiv);
    };

    const createAllTaskDivs = () => {
        const currentTab = SidebarHandler.getTabName();
        const currentCategoryTasks = DataArr.getRelevantTasks(currentTab);
        currentCategoryTasks.forEach(task => {
            appendTaskDiv(task);
        });
    };

    return { createTaskDetails, toggleViewDetails, appendTaskDiv, createAllTaskDivs }

})();

const TaskExpansion = (() => {
    let taskExpanded = {};

    // Use description in case task name gets reused
    const getDivDescription = (div) => {
        return div.querySelector(".description").textContent;
    };

    const checkTaskExists = (div) => {
        return taskExpanded.hasOwnProperty(getDivDescription(div));
    };

    const getStatus = (div) => {
        return taskExpanded[getDivDescription(div)];
    };

    const updateStatus = (div) => {
        taskExpanded[getDivDescription(div)] = true;
    };

    const resetStatus = (div) => {
        taskExpanded[getDivDescription(div)] = false;
    };

    const expandTaskDiv = (taskDiv, taskObj) => {
        const detailsDiv = TaskDom.createTaskDetails(taskObj);
        taskDiv.appendChild(detailsDiv);
    };
    
    const resetTaskDiv = (taskDiv) => {
        taskDiv.removeChild(taskDiv.lastElementChild);
    };

    const expandHandler = (taskDiv, taskObj, taskStatus) => {
        // If first time clicking on a task's div
        if (!(checkTaskExists(taskDiv))) {
            taskDiv.classList.toggle("expand-task");
            if (taskStatus) {
                expandTaskDiv(taskDiv, DataArr.getUpdatedTask());
            } else {
                expandTaskDiv(taskDiv, taskObj)
            };
            updateStatus(taskDiv);
        // Close div if opened
        } else if (checkTaskExists(taskDiv) && (getStatus(taskDiv))) {
            taskDiv.classList.toggle("expand-task");
            resetTaskDiv(taskDiv);
            resetStatus(taskDiv);
        // Open div if closed
        } else if (checkTaskExists(taskDiv) && (!(getStatus(taskDiv)))) {
            taskDiv.classList.toggle("expand-task");
            if (taskStatus) {
                expandTaskDiv(taskDiv, DataArr.getUpdatedTask());
            } else {
                expandTaskDiv(taskDiv, taskObj)
            };
            updateStatus(taskDiv);
        };
    };

    const expandDiv = (btn, taskDiv, taskObj) => {
        btn.addEventListener("click", function(e) {
            TaskDom.toggleViewDetails(btn);
            expandHandler(taskDiv, taskObj, TaskEditor.getTaskStatus());
        });
    };

    return { getDivDescription, expandDiv };

})();

const TaskRemoval = (() => {
    const displayContainer = document.querySelector(".display-container");
    
    const deleteObjectHandler = (relevantTasks, description, categoryName) => {
        const arrayWithoutTask = relevantTasks.filter(task => task.description !== description);
        TaskStorage.removeTask(categoryName, arrayWithoutTask);
    };

    const deleteTaskObject = (e) => {
        const taskDescription = TaskExpansion.getDivDescription(e.target.parentNode);
        const categoryName = displayContainer.firstElementChild.textContent;
        const modifiedName = NameHandler.getHyphenatedName(categoryName.toLowerCase());

        let thisCategoryTasks = DataArr.getRelevantTasks(modifiedName);
        deleteObjectHandler(thisCategoryTasks, taskDescription, modifiedName);
    };

    const deleteTaskCard = (div, divToRemove) => {
        div.removeChild(divToRemove);
    };

    const removeTaskHandler = () => {
        displayContainer.addEventListener("click", function(e) {
            if (e.target.classList.contains("delete-task")) {
                deleteTaskCard(displayContainer, e.target.parentNode.parentNode);
                deleteTaskObject(e);
            };
        });
    };

    return { deleteObjectHandler, deleteTaskCard, removeTaskHandler };

})();

export { TaskDom, TaskRemoval, TaskExpansion };