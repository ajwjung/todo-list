import { DataArr } from "./storage-arrays.js";
import { NameHandler } from "./name-handler.js";
import { TaskExpansion, TaskRemoval } from "./task-handler.js";

const TaskObjectEditor = (() => {
    const displayContainer = document.querySelector(".display-container");
    const popupBackdrop = document.querySelector(".backdrop");
    const closePopupBtn = document.getElementById("close-popup");
    const editTaskForm = document.getElementById("edit-task-form");
    let currentTask;

    const editTaskHandler = () => {
        displayContainer.addEventListener("click", function(e) {
            if (e.target.classList.contains("edit-details")) {
                openPopup();
                updateCurrentTask(e);
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
        });
    };

    const openPopup = () => {
        popupBackdrop.classList.remove("hidden");
    };

    const closePopup = () => {
        popupBackdrop.classList.add("hidden");
    };
    
    const updateCurrentTask = (e) => {
        const taskDescription = TaskExpansion.getDivDescription(e.target.parentNode);
        const categoryName = displayContainer.firstElementChild.textContent;
        const modifiedName = NameHandler.getHyphenatedName(categoryName.toLowerCase());

        let thisCategoryTasks = DataArr.getRelevantTasks(modifiedName);

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

    return { editTaskHandler };
})();

export { TaskObjectEditor }