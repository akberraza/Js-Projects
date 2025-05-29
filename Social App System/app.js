var arr = [];

// Check if users exist in localStorage
var users = localStorage.getItem("users");
if (users !== null) {
  arr = JSON.parse(users);
}

// Signup Function
function signup() {
  var getName = document.querySelector("#name");
  var getEmail = document.querySelector("#email");
  var getPassword = document.querySelector("#password");

  if (getName.value === "" || getEmail.value === "" || getPassword.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill all fields!"
    });
    return;
  }

  // Check if user already exists
  var existingUser = arr.filter(function (user) {
    return user.email === getEmail.value;
  });

  if (existingUser.length > 0) {
    Swal.fire({
      icon: "warning",
      title: "User already exists",
      text: "Please login."
    }).then(() => {
      window.location.href = "login.html";
    });
    return;
  }

  var obj = {
    name: getName.value,
    email: getEmail.value,
    password: getPassword.value
  };

  arr.push(obj);
  localStorage.setItem("users", JSON.stringify(arr));

  Swal.fire({
    icon: "success",
    title: "Signup Successful!",
    text: "Please login now."
  }).then(() => {
    getName.value = "";
    getEmail.value = "";
    getPassword.value = "";
    window.location.href = "login.html";
  });
}

// Login Function
function login() {
  var getEmail = document.querySelector("#email");
  var getPassword = document.querySelector("#password");

  if (getEmail.value === "" || getPassword.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please enter email and password!"
    });
    return;
  }

  var matchedUser = arr.filter(function (user) {
    return user.email === getEmail.value && user.password === getPassword.value;
  });

  if (matchedUser.length > 0) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser[0]));

    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = "home.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Email or password is incorrect!"
    });
  }

  getEmail.value = "";
  getPassword.value = "";
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// Add Post
function addPost() {
  var image = document.getElementById("postImage").value;
  var caption = document.getElementById("postCaption").value;
  var price = document.getElementById("postPrice").value;

  if (image === "" || caption === "" || price === "") {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Post",
      text: "Please fill all post fields!"
    });
    return;
  }
   
  var currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  var newPost = {
    image: image,
    caption: caption,
    price: price,
    email: currentUser.email
  };

  var allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
  allPosts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(allPosts));

  displayPosts();
}

// Display Posts for Logged In User
function displayPosts() {
  var currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  var posts = JSON.parse(localStorage.getItem("posts") || "[]");
  var container = document.getElementById("posts");
  if (!container) return;

  container.innerHTML = "";

  for (var i = 0; i < posts.length; i++) {
    if (posts[i].email === currentUser.email) {
      var card = document.createElement("div");
      card.className = "card p-2";
      card.innerHTML =
        `<img src="${posts[i].image}" class="card-img-top" style="height: 200px; object-fit: cover;">
        <div class="card-body">
        <h5 class='card-title'>${posts[i].caption}</h5>
        <p class='card-text'>Price: Rs: ${posts[i].price}</p>
        <button class='btn btn-outline-primary btn-sm'>Like</button> 
        <button class='btn btn-outline-secondary btn-sm'>Comment</button> 
        <button class='btn btn-outline-success btn-sm'>Share</button>
        </div>`;
      container.appendChild(card);
    }
  }
}

// Auto display posts on dashboard load
window.onload = function () {
  var path = window.location.pathname;
  if (path.includes("home.html")) {
    var user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      window.location.href = "login.html";
    } else {
      displayPosts();
    }
  }
};
