var inputBox = document.querySelector("#input-box");
var listContainer = document.querySelector("#list-container");

function addTask(){

    if(inputBox.value == ""){
        alert("Add some value")
    }
    else{
    listContainer.innerHTML += `<li>
    <span class="task-text">${inputBox.value}</span>
    <span>
    <button onclick="edit(this)" class="btn"><i class='fa-solid fa-pen'></i></button>
    <button onclick="del(this)" class="btn"><i class='fa-solid fa-trash'></i></button>
    </span>
    </li>`
    inputBox.value = ""
    }
}

function delAll(){
    listContainer.innerHTML = ""
}

function edit(btn){
     var taskText = btn.parentNode.parentNode.querySelector(".task-text").textContent;
     var edited = prompt("Edit Task Item",taskText);
     if(edited !== null && edited.trim() !== ""){
        btn.parentNode.parentNode.querySelector(".task-text").textContent = edited;
        inputBox.value = "";
     }
}

function del(btn){
    btn.parentNode.parentNode.remove()
}