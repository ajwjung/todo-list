import { DataArr } from "./storage-arrays.js";
// import { NameHandler } from "./name-handler.js";
import { TaskExpansion, TaskRemoval } from "./task-handler.js";
import { SidebarHandler } from "./sidebar-handler.js";

const TaskEditor = (() => {
    const displayContainer = document.querySelector(".display-container");
    const popupBackdrop = document.querySelector(".backdrop");
    const closePopupBtn = document.getElementById("close-popup");
    const editTaskForm = document.getElementById("edit-task-form");
    let currentDiv;
    let currentTask;
    let taskUpdated = false;

    const setCurrentDiv = (e) => {
        currentDiv = e.target.parentNode;
    };

    const getCurrentDiv = () => {
        return currentDiv;
    };

    const setStatus = () => {
        taskUpdated = true;
    };

    const resetStatus = () => {
        taskUpdated = false;
    };

    const getTaskStatus = () => {
        return taskUpdated;
    };

    const editTaskHandler = () => {
        displayContainer.addEventListener("click", function(e) {
            if (e.target.classList.contains("edit-details")) {
                openPopup();
                updateTaskVariable(e);
                setCurrentDiv(e);
                prefillForm();
                resetStatus();
            };
        });

        closePopupBtn.addEventListener("click", function(e) {
            closePopup();
        });

        editTaskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            editTaskObject(e);
            editTaskForm.reset();
            closePopup();
            updateCard();
            setStatus();
        });
    };

    const openPopup = () => {
        popupBackdrop.classList.remove("hidden");
    };

    const closePopup = () => {
        popupBackdrop.classList.add("hidden");
    };
    
    const updateTaskVariable = (e) => {
        const taskDescription = TaskExpansion.getDivDescription(e.target.parentNode);
        const categoryName = SidebarHandler.getTabName();

        let thisCategoryTasks = DataArr.getRelevantTasks(categoryName);

        for (let i = 0; i < thisCategoryTasks.length; i++) {
            if (thisCategoryTasks[i].description == taskDescription) {
                currentTask = thisCategoryTasks[i];
            };
        };
    };

    const getCurrentTask = () => {
        return currentTask;
    };

    const editTaskObject = () => {
        const taskToEdit = getCurrentTask();
        const taskCategory = taskToEdit.category;
        TaskRemoval.deleteObjectHandler(DataArr.getRelevantTasks(taskCategory), taskToEdit.description, taskCategory);
        DataArr.pushEditedTask();
    };

    const prefillForm = () => {
        const taskToEdit = getCurrentTask();
        const editTitleBox = document.getElementById("edit-task-title");
        const editDescriptionBox = document.getElementById("edit-task-description");
        const editNotesBox = document.getElementById("edit-task-notes");
        const editDateBox = document.getElementById("edit-task-due-date");
        const editPriorityBox = document.getElementById("edit-priority-level");
        const editCategoryBox = document.getElementById("edit-task-category");

        editTitleBox.setAttribute("value", taskToEdit.title);
        editDescriptionBox.setAttribute("value", taskToEdit.description);
        editNotesBox.value = taskToEdit.notes;
        editDateBox.setAttribute("value", taskToEdit.dueDate);
        editPriorityBox.value = taskToEdit.priority;
        editCategoryBox.value = taskToEdit.category;
    }

    const updateCard = () => {
        const editedTask = DataArr.getUpdatedTask();
        const divToUpdate = getCurrentDiv();
        console.log(editedTask);
        console.log(divToUpdate);
        
        divToUpdate.querySelector(".title").textContent = editedTask.title;
        divToUpdate.querySelector(".description").textContent = editedTask.description;
        divToUpdate.querySelector(".task-date").textContent = editedTask.dueDate;
        const priorityClasses = divToUpdate.querySelector(".priority-indicator").classList;
        for (const level in ["low", "medium", "high"]) {
            if (level in priorityClasses) {
                priorityClasses.remove(level);
                priorityClasses.add(editedTask.priority);
            };
        };
    };


    return { getCurrentDiv, getCurrentTask, getTaskStatus, editTaskHandler };
})();

export { TaskEditor }