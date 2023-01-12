const TaskEditor = (() => {
    const displayContainer = document.querySelector(".display-container");
    const popupBackdrop = document.querySelector(".backdrop");
    const closePopupBtn = document.getElementById("close-popup");

    const editTaskHandler = () => {
        displayContainer.addEventListener("click", function(e) {
            if (e.target.classList.contains("edit-details")) {
                openPopup();
            };
        });

        closePopupBtn.addEventListener("click", function(e) {
            closePopup();
        })
    };

    const openPopup = () => {
        popupBackdrop.classList.remove("hidden");
    };

    const closePopup = () => {
        popupBackdrop.classList.add("hidden");
    }

    return { editTaskHandler };
})();

export { TaskEditor }