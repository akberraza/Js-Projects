window.onload = function () {
  var userItemsContainer = document.getElementById("userItems");
  var cartCounterEl = document.getElementById("cartCounter");

  var itemsData = JSON.parse(localStorage.getItem("items")) || {};
  var currentUser = JSON.parse(localStorage.getItem("loggedIn"));

  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  var cartKey = "cart_" + currentUser.username;
  window.cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
  window.allItems = [];

  updateCartCounter();
  userItemsContainer.innerHTML = "";

  for (var restId in itemsData) {
    var categories = itemsData[restId];
    for (var category in categories) {
      if (Array.isArray(categories[category])) {
        window.allItems = window.allItems.concat(categories[category]);
      }
    }
  }

  if (window.allItems.length === 0) {
    userItemsContainer.innerHTML = '<p class="text-center text-muted">No food items available.</p>';
    return;
  }

  renderAllItems(userItemsContainer);
};

function renderAllItems(container) {
  for (var i = 0; i < window.allItems.length; i++) {
    var item = window.allItems[i];
    container.innerHTML +=
      '<div class="d-flex justify-content-center col-md-4 my-4">' +
      '<div class="custom-card">' +
      '<img src="' + item.image + '" alt="' + item.name + '" class="card-img">' +
      '<div class="title">' + item.name + '</div>' +
      '<div class="calories">' + item.description + '</div>' +
      '<div class="info">' +
      '<div class="price">Rs. ' + item.price + '</div>' +
      '<button class="add-btn" onclick="addToCart(\'' + item.name + '\')">+</button>' +
      '</div>' +
      '</div>' +
      '</div>';
  }
}

window.addToCart = function (itemName) {
  var item = window.allItems.find(function (itm) {
    return itm.name === itemName;
  });

  if (!item) return;

  var found = false;
  for (var i = 0; i < window.cartItems.length; i++) {
    if (window.cartItems[i].name === item.name) {
      window.cartItems[i].quantity += 1;
      found = true;
      break;
    }
  }

  if (!found) {
    window.cartItems.push({
      name: item.name,
      price: item.price,
      quantity: 1
    });
  }

  var currentUser = JSON.parse(localStorage.getItem("loggedIn"));
  if (currentUser) {
    localStorage.setItem("cart_" + currentUser.username, JSON.stringify(window.cartItems));
  }

  updateCartCounter();
  Swal.fire("Success", item.name + " added to cart!", "success");
};

function updateCartCounter() {
  var cartCount = window.cartItems.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);
  document.getElementById("cartCounter").textContent = 'Cart (' + cartCount + ')';
}

document.getElementById("cartCounter").addEventListener("click", function () {
  renderCartModal();
  var cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
});

function renderCartModal() {
  var cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = "";

  if (window.cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
    document.getElementById("totalPrice").textContent = '0';
    return;
  }

  var totalPrice = 0;

  window.cartItems.forEach(function (cartItem, index) {
    var fullItem = window.allItems.find(function (itm) {
      return itm.name === cartItem.name;
    }) || { image: "", description: "" };

    totalPrice += (cartItem.price || 0) * (cartItem.quantity || 1);

cartItemsContainer.innerHTML += 
  '<div class="card mb-3 border-0 w-100" style="border-top: 2px solid #ccc;">' +
    '<div class="row g-0 align-items-stretch">' +

      // Image Column - Circle Shape
      '<div class="col-4 d-flex justify-content-center align-items-center">' +
        '<img src="' + fullItem.image + '" class="img-fluid rounded-circle" style="width: 100px; height: 100px; object-fit: cover;" alt="' + cartItem.name + '">' +
      '</div>' +

      // Content Column
      '<div class="col-8 d-flex flex-column justify-content-between">' +
        '<div class="p-2">' +
          '<div class="d-flex justify-content-between align-items-start">' +
            '<div>' +
              '<h6 class="mb-1 fw-bold">' + cartItem.name + '</h6>' +
              '<small class="text-muted">' + fullItem.description + '</small>' +
            '</div>' +
            '<div class="text-end">' +
              '<span class="fw-bold">Rs ' + fullItem.price + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +

        // Quantity Controls (Fixed Border Issue)
        '<div class="px-2 pb-2 d-flex justify-content-end align-items-center">' +
          '<button class="btn btn-sm text-white me-0" style="background-color: #e91e63; border-top-left-radius: 10px; border-bottom-left-radius: 10px; height: 32px;" onclick="decreaseQuantity(' + index + ')">' +
            '<i class="bi bi-dash"></i>' +
          '</button>' +

          '<span class="d-inline-block text-center" style="min-width: 40px; height: 32px; line-height: 32px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">' + cartItem.quantity + '</span>' +

          '<button class="btn btn-sm text-white ms-0" style="background-color: #e91e63; border-top-right-radius: 10px; border-bottom-right-radius: 10px; height: 32px;" onclick="increaseQuantity(' + index + ')">' +
            '<i class="bi bi-plus"></i>' +
          '</button>' +
        '</div>' +

      '</div>' +
    '</div>' +
  '</div>';





  });

  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

function increaseQuantity(index) {
  window.cartItems[index].quantity += 1;
  syncCart();
}

function decreaseQuantity(index) {
  if (window.cartItems[index].quantity > 1) {
    window.cartItems[index].quantity -= 1;
  } else {
    window.cartItems.splice(index, 1);
  }
  syncCart();
}

function syncCart() {
  var currentUser = JSON.parse(localStorage.getItem("loggedIn"));
  if (currentUser) {
    localStorage.setItem("cart_" + currentUser.username, JSON.stringify(window.cartItems));
  }
  updateCartCounter();
  renderCartModal();
}

function placeOrder() {
  var loginUser = JSON.parse(localStorage.getItem("loggedIn"));
  if (!loginUser) {
    alert("Please log in to place an order.");
    window.location.href = "index.html";
    return;
  }

  if (!window.cartItems.length) {
    alert("Your cart is empty!");
    return;
  }

  var itemsData = JSON.parse(localStorage.getItem("items")) || {};
  var ordersByRestaurant = {};

  for (var restId in itemsData) {
    var restCategories = itemsData[restId];
    for (var category in restCategories) {
      restCategories[category].forEach(function (item) {
        var match = window.cartItems.find(function (ci) {
          return ci.name === item.name;
        });

        if (match) {
          if (!ordersByRestaurant[restId]) ordersByRestaurant[restId] = [];
          ordersByRestaurant[restId].push({
            name: match.name,
            price: match.price,
            quantity: match.quantity
          });
        }
      });
    }
  }

  for (var rId in ordersByRestaurant) {
    var restOrdersKey = "orders_" + rId;
    var existingOrders = JSON.parse(localStorage.getItem(restOrdersKey)) || [];

    existingOrders.push({
      id: Date.now(),
      userName: loginUser.name || loginUser.username || "Unknown",
      items: ordersByRestaurant[rId],
      status: "Pending"
    });

    localStorage.setItem(restOrdersKey, JSON.stringify(existingOrders));
  }

  window.cartItems = [];
  localStorage.removeItem("cart_" + loginUser.username);
  updateCartCounter();

  var cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  if (cartModal) cartModal.hide();

  Swal.fire("Order Placed!", "Your order has been sent to the restaurant.", "success");
}

function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
