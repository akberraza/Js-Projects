// ========== Global Arrays ==========
var userArr = JSON.parse(localStorage.getItem("users")) || [];
var restaurantArr = JSON.parse(localStorage.getItem("restaurants")) || [];

// ========== Navigation Functions ==========
function siginupForm() {
  window.location.href = "./usersignup.html";
}

function loginForm() {
  window.location.href = "./loginForm.html";
}

// ========== User Signup ==========
var userArr = JSON.parse(localStorage.getItem("users")) || [];

function userSignUp() {
  var name = document.querySelector("#signUserName").value.trim();
  var email = document.querySelector("#signUserEmail").value.trim();
  var phone = document.querySelector("#signUserPhone").value.trim();
  var country = document.querySelector("#signUserCountry").value.trim();
  var city = document.querySelector("#signUserCity").value.trim();
  var password = document.querySelector("#signUserPass").value.trim();

  if (!name || !email || !phone || !country || !city || !password) {
    Swal.fire("Missing Fields", "Please fill all fields!", "warning");
    return;
  }

  var exists = false;
  for (var i = 0; i < userArr.length; i++) {
    if (userArr[i].email === email) {
      exists = true;
      break;
    }
  }

  if (exists) {
    Swal.fire("User Exists", "Please login.", "warning").then(function () {
      window.location.href = "./loginForm.html";
    });
    return;
  }

  var userObj = {
    username: name,
    email: email,
    phone: phone,
    country: country,
    city: city,
    password: password
  };

  userArr.push(userObj);
  localStorage.setItem("users", JSON.stringify(userArr));

  Swal.fire("Success", "Signup Successful! Please login now.", "success").then(function () {
    window.location.href = "./loginForm.html";
  });
}


// ========== Restaurant Signup ==========
var restaurantArr = JSON.parse(localStorage.getItem("restaurants")) || [];

function resturantSignUp() {
  var name = document.querySelector("#signupResName").value.trim();
  var email = document.querySelector("#signupResEmail").value.trim();
  var country = document.querySelector("#signupRescountry").value.trim();
  var city = document.querySelector("#signuResCity").value.trim();
  var password = document.querySelector("#signupResPassword").value.trim();

  if (!name || !email || !country || !city || !password) {
    Swal.fire("Missing Fields", "Please fill all fields!", "warning");
    return;
  }

  var exists = false;
  for (var i = 0; i < restaurantArr.length; i++) {
    if (restaurantArr[i].email === email) {
      exists = true;
      break;
    }
  }

  if (exists) {
    Swal.fire("Restaurant Exists", "Please login.", "warning").then(function () {
      window.location.href = "./loginForm.html";
    });
    return;
  }

  var restaurantObj = {
    username: name,
    email: email,
    country: country,
    city: city,
    password: password
  };

  restaurantArr.push(restaurantObj);
  localStorage.setItem("restaurants", JSON.stringify(restaurantArr));
  localStorage.setItem("shopName", name);

  Swal.fire("Success", "Signup Successful! Please login now.", "success").then(function () {
    window.location.href = "./loginForm.html";
  });
}


// ========== Login ==========
function login() {
  var emailOrUsername = document.querySelector("#loginnameoremail").value.trim();
  var password = document.querySelector("#loginpassword").value.trim();
  var loginType = document.querySelector("#loginType").value;

  if (!emailOrUsername || !password) {
    Swal.fire("Missing Fields", "Please enter email and password!", "warning");
    return;
  }

  var user = null;

  if (loginType === "user") {
    for (var i = 0; i < userArr.length; i++) {
      if (
        (userArr[i].email === emailOrUsername || userArr[i].username === emailOrUsername) &&
        userArr[i].password === password
      ) {
        user = userArr[i];
        break;
      }
    }
  } else { 
    for (var j = 0; j < restaurantArr.length; j++) {
      if (
        (restaurantArr[j].email === emailOrUsername || restaurantArr[j].username === emailOrUsername) &&
        restaurantArr[j].password === password
      ) {
        user = restaurantArr[j];
        localStorage.setItem("shopName", user.username);
        localStorage.setItem("currentRestaurantEmail", user.email); 
        break;
      }
    }
  }

  if (user) { 
    localStorage.setItem("loggedIn", JSON.stringify(user));
    Swal.fire("Login Successful!", "", "success").then(function () {
      window.location.href = loginType === "user" ? "userDashboard.html" : "resturantDash.html";
    });
  } else {
    Swal.fire("Login Failed", "Email or password is incorrect!", "error");
  }
}
