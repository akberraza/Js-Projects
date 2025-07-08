let cart = [];
let allProducts = [];

function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(allProducts);
    });
}

function renderProducts(products) {
  let container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach(product => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="card-footer">
        <div>
          <h4>${product.title.slice(0, 18)}...</h4>
          <p>Rs. ${product.price}</p>
        </div>
        <button class="add-to-cart-btn">Add</button>
      </div>
    `;

    card.querySelector(".add-to-cart-btn").addEventListener("click", function () {
      addToCart(product.id, product.title, product.price, product.image);
    });

    container.appendChild(card);
  });
}

function addToCart(id, title, price, image) {
  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, title, price, image, qty: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  let container = document.getElementById("cart-container");
  container.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="cart-details">
        <h4>${item.title.slice(0, 22)}</h4>
        <p>Product description here</p>
        <div class="qty-controls">
          <button class="decrease">–</button>
          <span>${item.qty}</span>
          <button class="increase">+</button>
        </div>
      </div>
      <div class="cart-price">Rs. ${item.price}</div>
    `;

    cartItem.querySelector(".increase").addEventListener("click", () => {
      item.qty++;
      updateCartUI();
    });

    cartItem.querySelector(".decrease").addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(c => c.id !== item.id);
      }
      updateCartUI();
    });

    container.appendChild(cartItem);
  });

  document.getElementById("cart-count").innerText = count;
  document.getElementById("total-price").innerText = total.toFixed(2);

  const orderBtn = document.createElement("button");
  orderBtn.className = "place-order";
  orderBtn.innerText = "Place Order";
  orderBtn.onclick = function () {
    alert("Order placed successfully!");
    cart = [];
    updateCartUI();
  };
  container.appendChild(orderBtn);
}

// Toggle Cart Modal
document.getElementById("cartBtn").addEventListener("click", function () {
  document.getElementById("cart-modal").classList.toggle("hidden");
});

// Close X button
document.getElementById("close-cart").addEventListener("click", function () {
  document.getElementById("cart-modal").classList.add("hidden");
});

// Search Bar
document.getElementById("searchBar").addEventListener("input", function () {
  let searchText = this.value.toLowerCase();
  let filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchText));
  renderProducts(filtered);
});

fetchProducts();
