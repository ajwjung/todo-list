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

    return { createTaskDetails, appendTaskDiv, createAllTaskDivs }

})();

const TaskCards = (() => {
    let expanded = false;

    const checkExpanded = () => {
        return expanded;
    };

    const changeExpanded = () => {
        expanded = true;
    };

    const resetExpanded = () => {
        expanded = false;
    };

    const resetTaskDiv = (taskDiv) => {
        taskDiv.removeChild(taskDiv.lastElementChild);
    };

    const expandTaskHandler = (taskDiv, taskObj) => {
        if (!(checkExpanded())) {
            changeExpanded();
            taskDiv.classList.toggle("expand-task");
            const detailsDiv = TaskDom.createTaskDetails(taskObj);
            taskDiv.appendChild(detailsDiv);
        } else if (checkExpanded()) {
            resetExpanded();
            taskDiv.classList.toggle("expand-task")
            resetTaskDiv(taskDiv);
        };
    };

    const expandTask = (taskDiv, taskObj) => {
        taskDiv.addEventListener("click", function (e) {
            expandTaskHandler(taskDiv, taskObj);
        });
    };

    return { expandTask }
})();

export { TaskDom, TaskCards };