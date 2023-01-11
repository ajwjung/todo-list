import { DomElements } from "./dom-elements.js";
import { DataArr } from "./form-handler.js";
import { SidebarHandler } from "./sidebar-handler.js";

// Handles dom for tasks
const TaskDom = (() => {
    const createOverviewDiv = (taskObj) => {
        const newTaskDiv = DomElements.createDiv("task-overview");
        const priorityIndicator = DomElements.createDiv("priority-indicator", taskObj.priority);
        const checkbox = DomElements.createDiv("checkbox");
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

    const appendTaskDiv = (taskObj) => {
        const displayContainer = document.querySelector(".display-container");
        const newTaskDiv = createTaskDiv(taskObj);
        const viewDetailsBtn = newTaskDiv.querySelector(".view-details");

        TaskExpansion.expandDiv(viewDetailsBtn, newTaskDiv, taskObj);
        displayContainer.appendChild(newTaskDiv);
    };

    const createAllTaskDivs = () => {
        const currentTab = SidebarHandler.getTabName();
        const currentCategoryTasks = DataArr.allTasks[currentTab];
        currentCategoryTasks.forEach(task => {
            appendTaskDiv(task);
        });
    };

    return { createTaskDetails, appendTaskDiv, createAllTaskDivs }

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
    }

    const updateStatus = (div) => {
        taskExpanded[getDivDescription(div)] = true;
    };

    const resetStatus = (div) => {
        taskExpanded[getDivDescription(div)] = false;
    };

    const expandTaskDiv = (taskDiv, taskObj) => {
        const detailsDiv = TaskDom.createTaskDetails(taskObj);
        taskDiv.appendChild(detailsDiv);
    }
    
    const resetTaskDiv = (taskDiv) => {
        taskDiv.removeChild(taskDiv.lastElementChild);
    };

    const expandHandler = (taskDiv, taskObj) => {
        // If first time clicking on a task's div
        if (!(checkTaskExists(taskDiv))) {
            taskDiv.classList.toggle("expand-task");
            expandTaskDiv(taskDiv, taskObj);
            updateStatus(taskDiv);
        // Close div if opened
        } else if (checkTaskExists(taskDiv) && (getStatus(taskDiv))) {
            taskDiv.classList.toggle("expand-task");
            resetTaskDiv(taskDiv);
            resetStatus(taskDiv);
        // Open div if closed
        } else if (checkTaskExists(taskDiv) && (!(getStatus(taskDiv)))) {
            taskDiv.classList.toggle("expand-task");
            expandTaskDiv(taskDiv, taskObj);
            updateStatus(taskDiv);
        };
    };

    const expandDiv = (btn, taskDiv, taskObj) => {
        btn.addEventListener("click", function(e) {
            expandHandler(taskDiv, taskObj);
        });
    };

    return { expandDiv };

})();

export { TaskDom };