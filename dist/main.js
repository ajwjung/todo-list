(()=>{"use strict";const e=(()=>{const e=e=>(e=>/\-/g.test(e))(e)?e.replace(/\-/g," "):e,t=e=>e.toLowerCase().split(" ").map((e=>e.charAt(0).toUpperCase()+e.substring(1))).join(" ");return{replaceHyphensWithSpaces:e,getHyphenatedName:e=>(e=>/\s/g.test(e))(e)?e.replace(/\s+/g,"-"):e,capitalizeFirstLetters:t,makeNamePresentable:a=>{const n=e(a);return t(n)}}})(),t=(()=>{let t=["default"],n={default:[]},r=!1;return{checkNewCategoryAdded:a=>{const n=e.getHyphenatedName(a).toLowerCase();return t.includes(n)||(r=!0),r},resetCategoryAdded:()=>{r=!1},pushNewCategory:a=>{t.push(e.getHyphenatedName(a))},checkTaskHasCategory:e=>n.hasOwnProperty(e),addCategoryToObject:t=>{n[e.getHyphenatedName(t)]=[]},pushNewTask:()=>{const e=a.TodoTask();n[e.category].push(e)},updateArr:(e,t)=>{n[e]=t},allCategories:t,allTasks:n}})(),a=(()=>{const e=()=>document.querySelector("input[name='categoryName']").value,a=()=>({title:document.getElementById("task-title").value,description:document.getElementById("task-description").value,notes:document.getElementById("task-notes").value,dueDate:document.getElementById("task-due-date").value,priority:document.getElementById("priority-level").value,category:document.getElementById("task-category").value});return{getCategoryName:e,newCategoryHandler:()=>{const a=e();t.checkTaskHasCategory(a)||t.addCategoryToObject(a),t.pushNewCategory(a)},TodoTask:a,getTaskObject:()=>a(),newTaskHandler:e=>{t.pushNewTask(a())}}})(),n=(()=>{const a=()=>t.allCategories[t.allCategories.length-1];return{getNewCategory:a,appendCategoryDiv:()=>{const t=document.querySelector(".expanded-sidebar"),n=(t=>{const a=document.createElement("div");return a.setAttribute("id",t),a.classList.add("category"),a.textContent=e.makeNamePresentable(t),a})(a());t.insertBefore(n,t.lastElementChild)}}})(),r=(()=>{const t=document.querySelector(".display-container");return{addOptionsToSelect:()=>{const t=document.getElementById("task-category"),a=n.getNewCategory();t.add(new Option(e.makeNamePresentable(a),a))},clearContents:()=>{t.innerHTML=""},createDiv:(e,t)=>{const a=document.createElement("div");return a.classList.add(e),t&&a.classList.add(t),a},createPara:(e,t)=>{const a=document.createElement("p");return a.classList.add(e),a.textContent=t,a},createCategoryH1:t=>{const a=document.createElement("h1");return a.setAttribute("id","category-name"),a.textContent=e.makeNamePresentable(t),a},appendH1:e=>{t.appendChild(e)},createViewBtn:()=>{const e=document.createElement("button");return e.setAttribute("type","button"),e.classList.add("view-details"),e.classList.add("filter-pink"),e},createEditBtn:()=>{const e=document.createElement("button");return e.setAttribute("type","button"),e.classList.add("edit-details"),e.classList.add("filter-pink"),e},createDeleteBtn:()=>{const e=document.createElement("button");return e.setAttribute("type","button"),e.classList.add("delete-task"),e.classList.add("filter-pink"),e},expandCollapseTabs:(e,t)=>{const a=document.querySelector(e),n=document.querySelector(t);a.addEventListener("click",(function(e){n.classList.toggle("hidden")}))}}})(),s=(()=>{const e=e=>{const t=document.querySelector(".display-container"),a=(e=>{const t=r.createDiv("task-container"),a=(e=>{const t=r.createDiv("task-overview","strikethrough"),a=r.createDiv("priority-indicator",e.priority),n=r.createDiv("checkbox","unchecked"),s=r.createPara("title",e.title),d=r.createPara("description",e.description),c=r.createPara("task-date",e.dueDate),o=r.createViewBtn(),i=r.createEditBtn(),l=r.createDeleteBtn();return t.appendChild(a),t.appendChild(n),t.appendChild(s),t.appendChild(d),t.appendChild(c),t.appendChild(o),t.appendChild(i),t.appendChild(l),t})(e);return t.appendChild(a),t})(e),n=a.querySelector(".view-details"),s=a.querySelector(".checkbox");var c;(c=s).addEventListener("click",(function(e){c.parentNode.classList.toggle("strikethrough"),c.classList.toggle("unchecked")})),d.expandDiv(n,a,e),t.appendChild(a)};return{createTaskDetails:e=>{const t=r.createDiv("task-details"),a=r.createPara("task-notes",e.notes);return t.appendChild(a),t},toggleViewDetails:e=>{e.classList.toggle("hide-details")},appendTaskDiv:e,createAllTaskDivs:()=>{const a=o.getTabName();t.allTasks[a].forEach((t=>{e(t)}))}}})(),d=(()=>{let e={};const t=e=>e.querySelector(".description").textContent,a=a=>e.hasOwnProperty(t(a)),n=a=>e[t(a)],r=a=>{e[t(a)]=!0},d=(e,t)=>{const a=s.createTaskDetails(t);e.appendChild(a)};return{getDivDescription:t,expandDiv:(c,o,i)=>{c.addEventListener("click",(function(l){s.toggleViewDetails(c),((s,c)=>{a(s)?a(s)&&n(s)?(s.classList.toggle("expand-task"),(e=>{e.removeChild(e.lastElementChild)})(s),e[t(s)]=!1):a(s)&&!n(s)&&(s.classList.toggle("expand-task"),d(s,c),r(s)):(s.classList.toggle("expand-task"),d(s,c),r(s))})(o,i)}))}}})(),c=(()=>{const a=document.querySelector(".display-container");return{removeTaskHandler:()=>{a.addEventListener("click",(function(n){n.target.classList.contains("delete-task")&&(((e,t)=>{e.removeChild(t.target.parentNode.parentNode)})(a,n),(n=>{const r=d.getDivDescription(n.target.parentNode),s=a.firstElementChild.textContent,c=e.getHyphenatedName(s.toLowerCase()),o=t.allTasks[c];for(let e=0;e<o.length;e++)o[e].description==r&&(o.splice(e,1),t.updateArr(c,o))})(n))}))}}})(),o=(()=>{let e="default";const t=()=>e,a=e=>{e.classList.add("active-div")};return{getTabName:t,setThisDivActive:a,tabHandler:()=>{document.querySelector(".expanded-sidebar").addEventListener("click",(function(n){if(n.target.classList.contains("category")){document.querySelectorAll(".category").forEach((e=>{e.classList.remove("active-div")})),a(n.target),d=n.target.id,e=d,r.clearContents();const c=r.createCategoryH1(t());r.appendH1(c),s.createAllTaskDivs()}var d}))}}})(),i=(()=>{const e=document.querySelector(".display-container");return{editTaskHandler:()=>{e.addEventListener("click",(function(e){e.target.classList.contains("edit-details")&&(()=>{const e=document.querySelector(".backdrop");console.log(e.classList),e.classList.toggle("hidden")})()}))}}})(),l=()=>{const e=document.querySelector("#projects-form");e.addEventListener("submit",(function(s){s.preventDefault(),t.checkNewCategoryAdded(a.getCategoryName())&&(a.newCategoryHandler(),n.appendCategoryDiv(),r.addOptionsToSelect(),e.reset(),t.resetCategoryAdded())}))},u=()=>{const e=document.querySelector("#task-form");e.addEventListener("submit",(function(t){t.preventDefault(),a.newTaskHandler(t);const n=o.getTabName(),r=a.getTaskObject();r.category==n&&s.appendTaskDiv(r),e.reset()}))},p=()=>{const e=document.getElementById("default");o.setThisDivActive(e)};(()=>{document.querySelector("#task-due-date").min=(new Date).toISOString().split("T")[0],p(),r.expandCollapseTabs(".sidebar",".expanded-sidebar"),r.expandCollapseTabs("#add-new-task",".task-form-container");const e=r.createCategoryH1(o.getTabName());r.appendH1(e),l(),u(),o.tabHandler(),c.removeTaskHandler(),i.editTaskHandler()})()})();