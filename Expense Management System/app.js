var itemBox = document.querySelector("#Item-Box")
var priceBox = document.querySelector("#Price-Box");
var totalPrice = document.querySelector("#total");
var listContainer = document.querySelector("#List-Container")

function add() {
    if (itemBox.value == "" || priceBox.value == "") {
        alert("Enter some value") 
        
        itemBox.value = "";
        priceBox.value = "";
    }
  
    else {
        listContainer.innerHTML += `<li>
        <span class="inp">
        <span class="item">${itemBox.value}</span> 
        <span class="price">${priceBox.value}</span>
        </span>
        <span>
        <button onclick="edit(this)" class="btn"><i class="fa-solid fa-pen"></i></button>
        <button onclick="del(this)" class="btn"><i class="fa-solid fa-trash"></i></button>
        </span>
        </li>`

       var currentText = totalPrice.innerHTML;
       var currentTotal = parseFloat(currentText.replace("Total : ","")|| 0);
       var newPrice = parseFloat(priceBox.value) || 0;
       totalPrice.innerHTML = "Total : " + (currentTotal + newPrice);

        itemBox.value = "";
        priceBox.value = "";
    }
}
function edit(btn) { 
    var itemSpan = btn.parentNode.parentNode.querySelector(".item");
    var priceSpan = btn.parentNode.parentNode.querySelector(".price");

    var oldPrice = parseFloat(priceSpan.textContent) || 0;

    var item = prompt("Edit Task", itemSpan.textContent);
    var price = prompt("Edit Price", priceSpan.textContent);

    if (item === null || item.trim() === "" || price === null || price.trim() === "") {
        alert("Item aur Price dono ka input dena zaroori hai.");
        return;
    }

    var new_price = parseFloat(price) || 0;

    var currentTotal = parseFloat(totalPrice.innerHTML.replace("Total : ", "")) || 0;
    totalPrice.innerHTML = "Total : " + (currentTotal - oldPrice + new_price);

    itemSpan.textContent = item;
    priceSpan.textContent = price;
}

function del(delBtn) {
    let li = delBtn.parentNode.parentNode;
    let price = parseFloat(li.querySelector(".price").textContent) || 0;

    let currentTotal = parseFloat(totalPrice.innerHTML.replace("Total : ", "")) || 0;
    totalPrice.innerHTML = "Total : " + (currentTotal - price);

    li.remove();
}


