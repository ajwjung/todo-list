(()=>{"use strict";document.querySelector("#task-form").addEventListener("submit",(function(t){t.preventDefault();const e=new FormData(t.target);for(const[t,o]of e)console.log(`${t}: ${o}`)}))})();