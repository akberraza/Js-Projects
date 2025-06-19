function logout() {
  localStorage.removeItem("loginUser");
  localStorage.removeItem("currentRestaurantEmail");
  window.location.href = "index.html";
}

function renderOrders() {
  var currentRestaurantEmail = localStorage.getItem("currentRestaurantEmail");

  if (!currentRestaurantEmail) {
    console.error("Restaurant not logged in");
    return;
  }

  var orders = JSON.parse(localStorage.getItem("orders_" + currentRestaurantEmail)) || [];

  var pendingDiv = document.getElementById("pendingOrders");
  var acceptedDiv = document.getElementById("acceptedOrders");
  var deliveredDiv = document.getElementById("deliveredOrders");

  var rejectedDiv = document.getElementById("rejectedOrders") || document.createElement("div");

  pendingDiv.innerHTML = "";
  acceptedDiv.innerHTML = "";
  deliveredDiv.innerHTML = "";
  rejectedDiv.innerHTML = "";

  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];

    if (!order.id) {
      order.id = Date.now() + i;
    }

    var orderCard = document.createElement("div");
    orderCard.className = "card mb-3 shadow-sm";

    var userName = order.userName || "Unknown User";

    var itemsHtml = "";
    for (var j = 0; j < order.items.length; j++) {
      var item = order.items[j];
      var quantity = item.quantity || 1;
      itemsHtml += `<li>${item.name} - Rs ${item.price} x ${quantity}</li>`;
    }

    var buttonsHtml = "";

    if (order.status === "Pending") {
      buttonsHtml = `
        <button class="btn btn-success btn-sm me-2" onclick="updateOrderStatus(${order.id}, 'Accepted')">Accept</button>
        <button class="btn btn-danger btn-sm" onclick="updateOrderStatus(${order.id}, 'Rejected')">Reject</button>
      `;
    } else if (order.status === "Accepted") {
      buttonsHtml = `
        <button class="btn btn-warning btn-sm" onclick="updateOrderStatus(${order.id}, 'Delivered')">Mark Delivered</button>
      `;
    }

    orderCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title"><i class="bi bi-person-fill"></i> ${userName}</h5>
        <ul>${itemsHtml}</ul>
        <div class="mt-3">${buttonsHtml}</div>
        <p class="mt-2"><span class="badge bg-secondary">Status: ${order.status}</span></p>
      </div>
    `;

    if (order.status === "Pending") {
      pendingDiv.appendChild(orderCard);
    } else if (order.status === "Accepted") {
      acceptedDiv.appendChild(orderCard);
    } else if (order.status === "Delivered") {
      deliveredDiv.appendChild(orderCard);
    } else if (order.status === "Rejected") {
      rejectedDiv.appendChild(orderCard);
    }
  }

  localStorage.setItem("orders_" + currentRestaurantEmail, JSON.stringify(orders));
}

function updateOrderStatus(id, newStatus) {
  var currentRestaurantEmail = localStorage.getItem("currentRestaurantEmail");
  if (!currentRestaurantEmail) return;

  var orders = JSON.parse(localStorage.getItem("orders_" + currentRestaurantEmail)) || [];

  for (var i = 0; i < orders.length; i++) {
    if (orders[i].id === id) {
      orders[i].status = newStatus;
      break;
    }
  }

  localStorage.setItem("orders_" + currentRestaurantEmail, JSON.stringify(orders));
  renderOrders();
}

renderOrders();
