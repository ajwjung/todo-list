import { FormFields } from "./modules/form-handler.js";
import { DomElements } from "./modules/dom-elements.js";
import { SidebarHandler } from "./modules/sidebar-handler.js";
import { TaskRemoval } from "./modules/task-handler.js";
import { TaskEditor } from "./modules/task-editor.js";
import { DefaultLoad } from "./modules/default-load.js";

const RenderPage = (() => {
    FormFields.setMinDatePicker("#task-due-date");

    const defaultH1 = DomElements.createCategoryH1(SidebarHandler.getTabName());
    DomElements.appendH1(defaultH1);

    DefaultLoad.setDefault();
    DefaultLoad.loadSavedCategories();
    DefaultLoad.loadSavedTasks();
    DefaultLoad.addNewCategory();
    DefaultLoad.addNewTask();
    
    DomElements.expandCollapseTabs(".sidebar", ".expanded-sidebar");
    DomElements.expandCollapseTabs("#add-new-task", ".task-form-container");
    
    SidebarHandler.tabHandler();
    TaskRemoval.removeTaskHandler();
    TaskEditor.editTaskHandler();
})();