const TaskEditor = (() => {
    const displayContainer = document.querySelector(".display-container");

    const editTaskHandler = () => {
        displayContainer.addEventListener("click", function(e) {
            if (e.target.classList.contains("edit-details")) {
                togglePopup();
            };
        });
    };

    const togglePopup = () => {
        const popupBackdrop = document.querySelector(".backdrop");
        console.log(popupBackdrop.classList);
        popupBackdrop.classList.toggle("hidden");
    };

    return { editTaskHandler };
})();

export { TaskEditor }