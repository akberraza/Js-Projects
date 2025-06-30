// ========== Restaurant Dashboard (Category Section) ==========

// Global variables for category inputs and data
var categoryInput, imageInput, imgPreview, resItem, categories;

// Page initialization function – loads saved data from localStorage
function initializePage() {
  // Show restaurant name in navbar
  document.getElementById('shopNameNav').textContent = localStorage.getItem('shopName') || 'Restaurant';

  // Get input and display elements
  categoryInput = document.getElementById('category');
  imageInput = document.getElementById('resFoodImage');
  imgPreview = document.getElementById('imgPreview');
  resItem = document.getElementById('resItem');

  // Load categories specific to the logged-in restaurant
  var currentEmail = localStorage.getItem('currentRestaurantEmail');
  var allCategories = JSON.parse(localStorage.getItem('categories')) || {};
  categories = allCategories[currentEmail] || [];

  // Display categories on page
  renderCategories();
}

// Preview selected category image before saving
function previewImage() {
  var file = imageInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      imgPreview.src = e.target.result; // Show image preview
      imgPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// Display all saved categories as cards
function renderCategories() {
  resItem.innerHTML = '';

  // Show message if no category exists
  if (categories.length === 0) {
    resItem.innerHTML = '<p class="text-center text-muted">No categories added yet.</p>';
    return;
  }

  // Loop through all categories and create cards
  for (var i = 0; i < categories.length; i++) {
    var cat = categories[i];
    resItem.innerHTML +=
      '<div class="col-md-4 my-3">' +
      '<div class="card">' +
      '<img src="' + cat.image + '" class="card-img-top" alt="' + cat.name + '" style="height:200px; object-fit:cover;">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + cat.name + '</h5>' + 
      '<button class="pink btn btn-lg" onclick="deleteCategory(' + i + ')">Delete</button>' + // Delete button
      '<a href="resDashboard.html?category=' + encodeURIComponent(cat.name) + '" class="pink btn btn-lg ms-2">Items</a>' + // Go to items page
      '</div>' +
      '</div>' +
      '</div>';
  }
}

// Add a new category
function createCategory() {
  var name = categoryInput.value.trim();
  if (!name) {
    Swal.fire('Error', 'Category name is required', 'error');
    return;
  }

  // Check for duplicate category name
  for (var j = 0; j < categories.length; j++) {
    if (categories[j].name.toLowerCase() === name.toLowerCase()) {
      Swal.fire('Error', 'Category already exists!', 'error');
      return;
    }
  }

  // If image file selected, read it and save
  var file = imageInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      saveCategory(name, e.target.result); // Pass name + image
    };
    reader.readAsDataURL(file);
  } else {
    saveCategory(name, ''); // No image, just name
  }
}

// Save category to localStorage
function saveCategory(name, image) {
  var currentEmail = localStorage.getItem('currentRestaurantEmail');
  var allCategories = JSON.parse(localStorage.getItem('categories')) || {};

  // Add new category to the list
  categories.push({ name: name, image: image });
  allCategories[currentEmail] = categories; // Save per restaurant

  localStorage.setItem('categories', JSON.stringify(allCategories)); // Save all categories to storage

  // Reset form fields
  categoryInput.value = '';
  imageInput.value = '';
  imgPreview.src = '';
  imgPreview.style.display = 'none';

  renderCategories(); // Refresh display
  Swal.fire('Success', 'Category added successfully', 'success');
}

// Delete a category with confirmation
function deleteCategory(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Delete category "' + categories[index].name + '"?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
  }).then(function (result) {
    if (result.isConfirmed) {
      var currentEmail = localStorage.getItem('currentRestaurantEmail');
      var allCategories = JSON.parse(localStorage.getItem('categories')) || {};

      categories.splice(index, 1); // Remove category
      allCategories[currentEmail] = categories;
      localStorage.setItem('categories', JSON.stringify(allCategories));

      renderCategories(); // Refresh list
      Swal.fire('Deleted!', 'Category has been deleted.', 'success');
    }
  });
}

// Logout function – clears current login and redirects
function logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout'
  }).then(function (result) {
    if (result.isConfirmed) {
      // Clear only login/session data
      localStorage.removeItem('shopName');
      localStorage.removeItem('currentRestaurantEmail');

      // Redirect to home
      window.location.href = 'index.html';
    }
  });
}
