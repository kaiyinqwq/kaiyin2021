
let todoItems = [
];

let finishedItems = [];

function renderTodoItemList(todoItems, finishedItems) {
    //获得整个list框
    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";
    //遍历数组创建节点
    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";

        let inputEl = document.createElement("input");
        inputEl.type = "checkbox";

        //小框改变时触发
        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            //移除元素
            todoItems.splice(i, 1);
            console.log("finshed:", i, todoItems, finishedItems );
            // 重新渲染一次
            renderTodoItemList(todoItems, finishedItems);
        });

        //内容节点
        let titleEl = document.createElement("textarea");
        // titleEl.className = "title";

        titleEl.addEventListener("change", (e) => {
            //改变元素值
            todoItems[i].title=  titleEl.value;
            // 重新渲染一次
            renderTodoItemList(todoItems, finishedItems);
        });



        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";

        //如果当前数组成员
        if (item.isImportance) {
            //添加类名
            importanceEl.classList.add("open");
        }

        importanceEl.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }
           // 重新渲染一次
            renderTodoItemList(todoItems, finishedItems);
        });


        //创建删除按钮
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        //给表单框赋值内容
        titleEl.value = item.title;
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

        //给内容框添加以下内容
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
 
renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);