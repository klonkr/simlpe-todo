"use strict";
new ReloadList();

function ReloadList(){

    for (var todoItem in localStorage){
        var activeItems = document.getElementById("activeItems");
        var doneItems = document.getElementById("doneItems");
        var todoObject;
        if (localStorage !== null) {
            todoObject = JSON.parse(localStorage[todoItem]);
            if (todoObject.done === false){
                if (activeItems.firstElementChild === null){
                    var li = document.createElement("Li");
                    var textnode = document.createTextNode(todoObject.toBeDone);
                    var span = document.createElement("span");
                    span.setAttribute("class", "fa fa-square-o")
                    li.appendChild(span)
                    li.appendChild(textnode);
                    li.addEventListener("click", MoveToDoneItems);
                    li.setAttribute("id", todoObject.id);
                    activeItems.appendChild(li);

                } else {
                    var liItems = activeItems.getElementsByTagName("Li");
                    var hit = false;
                    for (var i = 0; i < liItems.length; i++) {
                        if (liItems[i].getAttribute("id") == todoObject.id) {
                            hit = true;
                        }
                    }
                    if (hit === false) {
                        var li = document.createElement("Li");
                        var textnode = document.createTextNode(todoObject.toBeDone);
                        var span = document.createElement("span");
                        span.setAttribute("class", "fa fa-square-o")
                        li.appendChild(span)
                        li.appendChild(textnode);
                        li.addEventListener("click", MoveToDoneItems);
                        li.setAttribute("id", todoObject.id);

                        activeItems.appendChild(li);
                    }
                }
            } else if (todoObject.done === true){
                if (doneItems.firstElementChild === null){
                    var li = document.createElement("Li");
                    var textnode = document.createTextNode(todoObject.toBeDone);
                    var span = document.createElement("span");
                    span.setAttribute("class", "fa fa-square")
                    li.appendChild(span)
                    li.appendChild(textnode);
                    li.addEventListener("click", DeleteItem);
                    li.setAttribute("id", todoObject.id);
                    doneItems.appendChild(li);

                } else {
                    var liItems = doneItems.getElementsByTagName("Li");
                    var hit = false;
                    for (var i = 0; i < liItems.length; i++) {
                        if (liItems[i].getAttribute("id") == todoObject.id) {
                            hit = true;
                        }
                    }
                    if (hit === false) {
                        var li = document.createElement("Li");
                        var textnode = document.createTextNode(todoObject.toBeDone);
                        var span = document.createElement("span");
                        span.setAttribute("class", "fa fa-square")
                        li.appendChild(span)
                        li.appendChild(textnode);
                        li.addEventListener("click", DeleteItem);
                        li.setAttribute("id", todoObject.id);
                        doneItems.appendChild(li);
                    }
                }
            }
        }

    }
}
function AddTodoItem() {
    var numberToBeat = GetLastIdFromLocalStorage();
    var todo = {toBeDone: "", done: false, id: numberToBeat};
    todo.toBeDone = document.getElementById("todoName").value;
    localStorage.setItem(numberToBeat.toString(), JSON.stringify(todo));
    ReloadList();
}

function GetLastIdFromLocalStorage(){
    var numberToBeat = 0;
    if (localStorage.getItem("1") == null) {
        numberToBeat = 1;
    } else {
        for (var key in localStorage){
            if (parseInt(key) >= numberToBeat) {
                numberToBeat = parseInt(key) + 1;
            }
        }
    }
    return numberToBeat
}
function MoveToDoneItems(){
    var todoId = this.getAttribute("id");
    var todoItem = JSON.parse(localStorage[todoId]);
    todoItem.done = true;
    localStorage.setItem(todoId, JSON.stringify(todoItem));
    var li = document.getElementById(todoItem.id);
    li.parentNode.removeChild(li);
    ReloadList();
}
function DeleteItem(){
    var todoId = this.getAttribute("id");
    var todoItem = JSON.parse(localStorage[todoId]);
    localStorage.removeItem(todoId);
    var li = document.getElementById(todoItem.id);
    li.parentNode.removeChild(li);
}