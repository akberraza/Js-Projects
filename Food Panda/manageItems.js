// ======== Get Category Name from URL ========
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

// ======== Set Page Titles (Category & Shop Name) ========
document.getElementById("categoryNameTitle").textContent = categoryName;
document.getElementById("shopNameNav").textContent = localStorage.getItem("shopName") || "Restaurant";

// ======== Define Variables for DOM Elements ========
var currentRestaurantEmail = localStorage.getItem("currentRestaurantEmail");
var itemsContainer = document.getElementById("itemsContainer");
var itemNameInput = document.getElementById("itemName");
var itemPriceInput = document.getElementById("itemPrice");
var itemDescInput = document.getElementById("itemDescription");
var itemImageInput = document.getElementById("itemImage");
var itemImgPreview = document.getElementById("itemImgPreview");
var itemIndexInput = document.getElementById("itemIndex");

// ======== Load Existing Items from localStorage ========
var allItemsData = JSON.parse(localStorage.getItem("items")) || {};

// ======== Initialize Empty Structure If Needed ========
if (!allItemsData[currentRestaurantEmail]) {
  allItemsData[currentRestaurantEmail] = {};
}
if (!allItemsData[currentRestaurantEmail][categoryName]) {
  allItemsData[currentRestaurantEmail][categoryName] = [];
}

// ======== Shortcut to Category-Specific Items Array ========
var itemsData = allItemsData[currentRestaurantEmail][categoryName];

// ======== Preview Image Function ========
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

// ======== Render Items in Cards ========
function renderItems() {
  itemsContainer.innerHTML = "";

  if (itemsData.length === 0) {
    itemsContainer.innerHTML = '<p class="text-center text-muted">No items in this category yet.</p>';
    return;
  }

  for (var i = 0; i < itemsData.length; i++) {
    var item = itemsData[i];
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

// ======== Fill Form Inputs to Edit Existing Item ========
function editItem(index) {
  var item = itemsData[index];
  itemNameInput.value = item.name;
  itemPriceInput.value = item.price;
  itemDescInput.value = item.description;
  itemImgPreview.src = item.image;
  itemImgPreview.style.display = "block";
  itemIndexInput.value = index;

  var myModal = new bootstrap.Modal(document.getElementById('itemModal'));
  myModal.show();
}

// ======== Delete Item with Confirmation ========
function deleteItem(index) {
  Swal.fire({
    title: "Are you sure?",
    text: 'Delete item "' + itemsData[index].name + '"?',
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then(function (result) {
    if (result.isConfirmed) {
      itemsData.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(allItemsData));
      renderItems();
      Swal.fire("Deleted!", "Item has been deleted.", "success");
    }
  });
}

// ======== Save New or Edited Item ========
function saveItem() {
  var name = itemNameInput.value.trim();
  var price = itemPriceInput.value.trim();
  var description = itemDescInput.value.trim();
  var image = itemImgPreview.src;
  var index = itemIndexInput.value;

  // Validate fields
  if (!name || !price || !description || !image) {
    Swal.fire("Error", "All fields are required!", "error");
    return;
  }

  var newItem = { name: name, price: price, description: description, image: image };

  if (index) {
    // Update existing item
    itemsData[index] = newItem;
  } else {
    // Add new item
    itemsData.push(newItem);
  }

  // Save changes to localStorage
  allItemsData[currentRestaurantEmail][categoryName] = itemsData;
  localStorage.setItem("items", JSON.stringify(allItemsData));

  // Reset form
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

// ======== Initial Render on Page Load ========
renderItems();
