import { CategoryDom } from "./category-handler.js";
import { CategoryStorage } from "./local-storage.js";
import { NameHandler } from "./name-handler.js";

// Handles creating dom elements
const DomElements = (() => {
    const displayContainer = document.querySelector(".display-container");

    const addExistingOptions = (categoryName) => {
        const newTaskFormSelect = document.getElementById("task-category");
        const editTaskFormSelect = document.getElementById("edit-task-category");
        newTaskFormSelect.add(new Option(NameHandler.makeNamePresentable(categoryName), categoryName));
        editTaskFormSelect.add(new Option(NameHandler.makeNamePresentable(categoryName), categoryName))
    };

    const addNewOptionToSelect = (categoryName) => {
        const newTaskFormSelect = document.getElementById("task-category");
        const editTaskFormSelect = document.getElementById("edit-task-category");
        const category = CategoryDom.getNewCategory(categoryName);
        newTaskFormSelect.add(new Option(NameHandler.makeNamePresentable(category), category));
        editTaskFormSelect.add(new Option(NameHandler.makeNamePresentable(category), category))
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
    };

    const createViewBtn = () => {
        const newViewBtn = document.createElement("button");
        newViewBtn.setAttribute("type", "button");
        newViewBtn.classList.add("view-details");
        newViewBtn.classList.add("filter-pink");
        
        return newViewBtn;
    };

    const createEditBtn = () => {
        const newEditBtn = document.createElement("button");
        newEditBtn.setAttribute("type", "button");
        newEditBtn.classList.add("edit-details");
        newEditBtn.classList.add("filter-pink");
        
        return newEditBtn;
    };

    const createDeleteBtn = () => {
        const newDeleteBtn = document.createElement("button");
        newDeleteBtn.setAttribute("type", "button");
        newDeleteBtn.classList.add("delete-task");
        newDeleteBtn.classList.add("filter-pink");
        
        return newDeleteBtn;
    };

    const expandCollapseTabs = (boxName, hiddenBoxName) => {
        const visibleBox = document.querySelector(boxName);
        const hiddenBox = document.querySelector(hiddenBoxName);
        visibleBox.addEventListener("click", function(e) {
            hiddenBox.classList.toggle("hidden");
        });
    };

    return { addExistingOptions, addNewOptionToSelect, clearContents, 
        createDiv,createPara, createCategoryH1, appendH1, 
        createViewBtn, createEditBtn, createDeleteBtn, expandCollapseTabs }

})();

export { DomElements };