ReloadList();

function ReloadList(){

    
    for (var todoItem in localStorage){
        var activeItems = document.getElementById("activeItems");
        var doneItems = document.getElementById("doneItems");

        var todoObject = JSON.parse(localStorage[todoItem]);
        if (todoObject.done === false){
            if (activeItems.firstElementChild === null){
                var li = document.createElement("Li");
                var textnode = document.createTextNode(todoObject.toBeDone);
                li.appendChild(textnode);
                li.setAttribute("onclick", "MoveToDoneItems(this)");
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
                        li.appendChild(textnode);
                        li.setAttribute("onclick", "MoveToDoneItems(this)");
                        li.setAttribute("id", todoObject.id);
                        activeItems.appendChild(li);
                    }
                }
            } else if (todoObject.done === true){
            if (doneItems.firstElementChild === null){
                var li = document.createElement("Li");
                var textnode = document.createTextNode(todoObject.toBeDone);
                li.appendChild(textnode);
                li.setAttribute("onclick", "DeleteItem(this)");
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
                    li.appendChild(textnode);
                    li.setAttribute("onclick", "DeleteItem(this)");
                    li.setAttribute("id", todoObject.id);
                    doneItems.appendChild(li);
                }
            }
        }
    }

    // for (var todoItem in localStorage){
    //     var todoObject = JSON.parse(localStorage[todoItem]);
    //     if (todoObject.done == false) {
    //         var activeLi = activeItems.getElementsByTagName("li");
    //         var foundItem;
    //         for (var i = 0; i < activeLi.length; i++) {
    //             if (activeLi[i].getAttribute("id") == todoObject.id){
    //                 foundItem = true;
    //             }
    //         }
    //
    //         if (foundItem != true) {
    //
    //             var li = document.createElement("Li");
    //             var textnode = document.createTextNode(todoObject.toBeDone);
    //             li.appendChild(textnode);
    //             li.setAttribute("onclick", "MoveToDoneItems(this)");
    //             li.setAttribute("id", todoObject.id);
    //             activeItems.appendChild(li);
    //
    //         }
    //     } else if (todoObject.done == true){
    //         var doneLi = doneItems.getElementsByTagName("li");
    //         var foundItem;
    //         for (var i = 0; i < doneLi.length; i++) {
    //             if (doneLi[i].getAttribute("id") == todoObject.id){
    //                 foundItem = true;
    //             }
    //         }
    //
    //         if (foundItem != true) {
    //
    //             var li = document.createElement("Li");
    //             var textnode = document.createTextNode(todoObject.toBeDone);
    //             li.appendChild(textnode);
    //             li.setAttribute("onclick", "MoveToDoneItems(this)");
    //             li.setAttribute("id", todoObject.id);
    //             doneItems.appendChild(li);
    //
    //         }
    //     }
    // }


    // if (activeItems.childElementCount == 0){
    //     for (i=1; ( i <= localStorage.length); i++) {
    //         var something2 = JSON.parse(localStorage[i]);
    //         var li = document.createElement("Li");
    //         var textnode = document.createTextNode(something2.toBeDone);
    //         li.appendChild(textnode);
    //         if (something2.done === false){
    //             li.setAttribute("onclick", "MoveToDoneItems(this)");
    //             li.setAttribute("TodoId", something2.id);
    //             activeItems.appendChild(li);
    //
    //         }
    //     }
    // } else {
    //     var todoItem = JSON.parse(localStorage[localStorage.length]);
    //     if (todoItem.done == false){
    //         var node = document.createElement("Li")
    //         var textnode = document.createTextNode(todoItem.toBeDone);
    //         node.appendChild(textnode);
    //         activeItems.appendChild(node);
    //     }
    // }
    // if (doneItems.childElementCount == 0) {
    //     for (i = 1; ( i <= localStorage.length); i++) {
    //         var todoItem = JSON.parse(localStorage[i]);
    //         var li = document.createElement("Li");
    //         var textnode = document.createTextNode(todoItem.toBeDone);
    //         li.appendChild(textnode);
    //
    //         if (todoItem.done === true){
    //             li.setAttribute("TodoId", todoItem.id);
    //             doneItems.appendChild(li);
    //         }
    //     }
    // } else {
    //     var todoItem = JSON.parse(localStorage[localStorage.length]);
    //     if (todoItem.done === true){
    //         var node = document.createElement("Li");
    //         var textnode = document.createTextNode(todoItem.toBeDone);
    //         node.appendChild(textnode);
    //         doneItems.appendChild(node);
    //     }
    // }
}
function DoSomething() {
    var numberToBeat = GetLastIdFromLocalStorage();
    var todo = {toBeDone: "", done: false, id: numberToBeat};
    todo.toBeDone = document.getElementById("todoName").value;
    localStorage.setItem(numberToBeat.toString(), JSON.stringify(todo));
    ReloadList();
    //TODO
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
function MoveToDoneItems(test){
    var todoId = test.getAttribute("id");
    var todoItem = JSON.parse(localStorage[todoId]);
    todoItem.done = true;
    localStorage.setItem(todoId, JSON.stringify(todoItem));
    var li = document.getElementById(todoItem.id);
    li.parentNode.removeChild(li);
    ReloadList();
}
function DeleteItem(liItem){
    var todoId = liItem.getAttribute("id");
    var todoItem = JSON.parse(localStorage[todoId]);
    localStorage.removeItem(todoId);
    var li = document.getElementById(todoItem.id);
    li.parentNode.removeChild(li);
}