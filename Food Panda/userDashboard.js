/*======= userDashboard ====*/

window.onload = function () {
  var userItemsContainer = document.getElementById("userItems");
  var cartCounterEl = document.getElementById("cartCounter");

  var itemsData = JSON.parse(localStorage.getItem("items")) || {};
  window.cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCounter();

  userItemsContainer.innerHTML = "";

  var allItems = [];
  for (var key in itemsData) {
    if (itemsData.hasOwnProperty(key)) {
      allItems = allItems.concat(itemsData[key]);
    }
  }

  if (allItems.length === 0) {
    userItemsContainer.innerHTML = '<p class="text-center text-muted">No food items available.</p>';
    return;
  }

  for (var i = 0; i < allItems.length; i++) {
    var item = allItems[i];
    var itemId = 'item-' + i;

    userItemsContainer.innerHTML +=
      '<div class="d-flex justify-content-center col-md-4 my-4">' +
      '<div class="custom-card">' +
      '<img src="' + item.image + '" alt="' + item.name + '" class="card-img">' +
      '<div class="title">' + item.name + '</div>' +
      '<div class="calories">' + item.description + '</div>' +
      '<div class="info">' +
      '<div class="price">Rs. ' + item.price + '</div>' +
      '<button class="add-btn" onclick="addToCart(\'' + itemId + '\')">+</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    window[itemId] = item;
  }
};

function updateCartCounter() {
  var cartCount = window.cartItems.length;
  document.getElementById("cartCounter").textContent = 'Cart (' + cartCount + ')';
}

function addToCart(itemId) {
  var item = window[itemId];
  window.cartItems.push(item);
  localStorage.setItem("cart", JSON.stringify(window.cartItems));
  updateCartCounter();
  Swal.fire("Success", item.name + " added to cart!", "success");
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
