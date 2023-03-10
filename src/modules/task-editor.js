import { DataArr } from "./storage-arrays.js";
import { TaskExpansion, TaskRemoval } from "./task-handler.js";
import { SidebarHandler } from "./sidebar-handler.js";
import { TaskStorage } from "./local-storage.js";

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
        // When edit button clicked
        displayContainer.addEventListener("click", function(e) {
            if (e.target.classList.contains("edit-details")) {
                openPopup();
                setCurrentTaskVar(e);
                setCurrentDiv(e);
                prefillForm();
                resetStatus();
            };
        });

        // Popup closed
        closePopupBtn.addEventListener("click", function(e) {
            closePopup();
        });

        // When edited task form submitted
        editTaskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            editTaskObject(); 
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
    
    // Allows us to find the current task    
    const setCurrentTaskVar = (e) => {
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

    // Modifies task in storage array
    const editTaskObject = () => {
        const taskToEdit = getCurrentTask();
        const taskCategory = taskToEdit.category;
        TaskRemoval.deleteObjectHandler(DataArr.getRelevantTasks(taskCategory), taskToEdit.description, taskCategory);
        TaskStorage.pushTask("edit task");
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
        const editTask = DataArr.getUpdatedTask();
        const divToUpdate = getCurrentDiv();
        
        // update task card if still in same category
        if (editTask.category == SidebarHandler.getTabName()) {
            divToUpdate.querySelector(".title").textContent = editTask.title;
            divToUpdate.querySelector(".description").textContent = editTask.description;
            divToUpdate.querySelector(".task-date").textContent = editTask.dueDate;
            const priorityClasses = divToUpdate.querySelector(".priority-indicator").classList;
            priorityClasses.remove("low", "medium", "high");
            priorityClasses.add(editTask.priority);
        } else {
            // remove from display if different category
            TaskRemoval.deleteTaskCard(divToUpdate.parentNode, divToUpdate);
        }
    };


    return { getCurrentDiv, getCurrentTask, getTaskStatus, editTaskHandler };
})();

export { TaskEditor }