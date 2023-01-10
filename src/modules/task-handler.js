import { TaskDom } from "./dom-elements.js";

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

export { TaskCards };