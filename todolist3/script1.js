let todoItems = [
];

let finishedItems = [];

function renderTodoItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";///

        let inputEl = document.createElement("input");
        inputEl.type = "checkbox";

        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            todoItems.splice(i, 1);

            console.log("finshed:", i, todoItems, finishedItems );
            renderTodoItemList(todoItems, finishedItems);

        });

        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";

        if (item.isImportance) {
            importanceEl.classList.add("open");
        }

        importanceEl.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }

            renderTodoItemList(todoItems, finishedItems);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";

        titleEl.innerText = item.title;
        //监听删除按钮
        deleteBtn.addEventListener('click',(e)=>{
            // 获取点击删除的id(下标)
            let id = e.path[0].getAttribute('id')
            // 从todoItems中删除该条
            todoItems.splice(id,1)
            // 重新渲染一次
            renderTodoItemList(todoItems, finishedItems);
        })
        // 给删除按钮绑定id(下标)
        deleteBtn.setAttribute('id',i)
        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deleteBtn);
        
        paneEl.append(itemDiv);
    }

}
/*function deleteInputPane(todoItems){
    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";
    let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";//添加删除按键
        deleteBtn.className = "delete-btn"
        
    console.log(123);

   for (let i=0; i < todoItems.length; i++ ) {
       let item = todoItems[i];
       let itemDiv = document.createElement("div");//赋予一个元素
       itemDiv.className = "todo-item";//定义待办项
       let deleteBtnE1 = listPaneE1.querySelector("#delete-btn")
       deleteBtnE1.addEventListener("click", (e)=>{
          todoItems.splice(i, 1);
          renderTodoItemList(todoItems, finishedItems);});
   }
}*/


function renderFinishedItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < finishedItems.length; i++ ) {
        let item = finishedItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";


        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        if (item.isImportance) {
            importanceEl.classList.add("open");
        }
        

        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        
        paneEl.append(itemDiv);
    }

}


function renderInputPane(todoItems) {
    let inputPaneEl = document.querySelector("#todolist > .input-pane");

    let addBtnEl = inputPaneEl.querySelector("#add-btn");
    let hisBtnEl = inputPaneEl.querySelector("#his-btn");

    addBtnEl.addEventListener("click", (e)=>{
        let inputEl = inputPaneEl.querySelector("input");

        todoItems.push({
            title: inputEl.value,
            isFinished: false,
            isImportance: false, 
        })
        
        console.log("add a item: ", inputEl.value);
        renderTodoItemList(todoItems, finishedItems);
    });

    hisBtnEl.addEventListener("click", (e)=>{
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");
            renderTodoItemList(todoItems, finishedItems)
        } else {
            hisBtnEl.classList.add("open");
            renderFinishedItemList(todoItems, finishedItems)
        }
    });

    // let btnEl = document.querySelector("#todolist #add-btn");
}
/*function save(){
    localStorage.setItem('todos',JSON.stringify(todos)); }// 将数组转为字符串并储存在本地 

function saveData(data) {

localStorage.setItem("mytodolist", JSON.stringify(data)); //JS对象转换成JSON对象存进本地缓存

}
function loadData() {

var hisTory = localStorage.getItem("mytodolist");

if(hisTory !=null){

return JSON.parse(hisTory);  //JSON对象转换为JS对象

}

else { return []; }

}*/
renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);
