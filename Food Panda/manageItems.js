var categoryName = (function () {
  var params = window.location.search.substring(1).split('&');
  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split('=');
    if (decodeURIComponent(pair[0]) === 'category') {
      return decodeURIComponent(pair[1]);
    }
  }
  return "Unknown";
})();

document.getElementById("categoryNameTitle").textContent = categoryName;
document.getElementById("shopNameNav").textContent = localStorage.getItem("shopName") || "Restaurant";

var itemsContainer = document.getElementById("itemsContainer");
var itemNameInput = document.getElementById("itemName");
var itemPriceInput = document.getElementById("itemPrice");
var itemDescInput = document.getElementById("itemDescription");
var itemImageInput = document.getElementById("itemImage");
var itemImgPreview = document.getElementById("itemImgPreview");
var itemIndexInput = document.getElementById("itemIndex");

var itemsData = JSON.parse(localStorage.getItem("items")) || {};
if (!itemsData[categoryName]) {
  itemsData[categoryName] = [];
}

function previewImage() {
  var file = itemImageInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      itemImgPreview.src = e.target.result;
      itemImgPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

function renderItems() {
  var items = itemsData[categoryName];
  itemsContainer.innerHTML = "";

  if (items.length === 0) {
    itemsContainer.innerHTML = '<p class="text-center text-muted">No items in this category yet.</p>';
    return;
  }

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    itemsContainer.innerHTML +=
      '<div class="col-md-4 my-3">' +
        '<div class="card">' +
          '<img src="' + item.image + '" class="card-img-top" style="height:200px; object-fit:cover;" alt="' + item.name + '">' +
          '<div class="card-body">' +
            '<h5 class="card-title">' + item.name + '</h5>' +
            '<p class="card-text">' + item.description + '</p>' +
            '<p><strong>Rs: </strong>' + item.price + '</p>' +
            '<button class="btn btn-lg pink" onclick="editItem(' + i + ')">Edit</button>' +
            '<button class="btn btn-lg pink ms-2" onclick="deleteItem(' + i + ')">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
}

function editItem(index) {
  var item = itemsData[categoryName][index];
  itemNameInput.value = item.name;
  itemPriceInput.value = item.price;
  itemDescInput.value = item.description;
  itemImgPreview.src = item.image;
  itemImgPreview.style.display = "block";
  itemIndexInput.value = index;

  // SHOW MODAL MANUALLY
  var myModal = new bootstrap.Modal(document.getElementById('itemModal'));
  myModal.show();
}


function deleteItem(index) {
  Swal.fire({
    title: "Are you sure?",
    text: 'Delete item "' + itemsData[categoryName][index].name + '"?',
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then(function (result) {
    if (result.isConfirmed) {
      itemsData[categoryName].splice(index, 1);
      localStorage.setItem("items", JSON.stringify(itemsData));
      renderItems();
      Swal.fire("Deleted!", "Item has been deleted.", "success");
    }
  });
}

function saveItem() {
  var name = itemNameInput.value.trim();
  var price = itemPriceInput.value.trim();
  var description = itemDescInput.value.trim();
  var image = itemImgPreview.src;
  var index = itemIndexInput.value;

  if (!name || !price || !description || !image) {
    Swal.fire("Error", "All fields are required!", "error");
    return;
  }

  var newItem = { name: name, price: price, description: description, image: image };

  if (index) {
    itemsData[categoryName][index] = newItem;
  } else {
    itemsData[categoryName].push(newItem);
  }

  localStorage.setItem("items", JSON.stringify(itemsData));

  itemNameInput.value = "";
  itemPriceInput.value = "";
  itemDescInput.value = "";
  itemImageInput.value = "";
  itemImgPreview.src = "";
  itemImgPreview.style.display = "none";
  itemIndexInput.value = "";

  Swal.fire("Success", "Item saved successfully!", "success");
  renderItems();
}

renderItems();
