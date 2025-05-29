// ========== Restaurant Dashboard (Category Section) ==========
var categoryInput, imageInput, imgPreview, resItem, categories;

function initializePage() {
  document.getElementById('shopNameNav').textContent = localStorage.getItem('shopName') || 'Restaurant';

  categoryInput = document.getElementById('category');
  imageInput = document.getElementById('resFoodImage');
  imgPreview = document.getElementById('imgPreview');
  resItem = document.getElementById('resItem');

  categories = JSON.parse(localStorage.getItem('categories')) || [];
  renderCategories();
}

function previewImage() {
  var file = imageInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      imgPreview.src = e.target.result;
      imgPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function renderCategories() {
  resItem.innerHTML = '';
  if (categories.length === 0) {
    resItem.innerHTML = '<p class="text-center text-muted">No categories added yet.</p>';
    return;
  }

  for (var i = 0; i < categories.length; i++) {
    var cat = categories[i];
    resItem.innerHTML +=
      '<div class="col-md-4 my-3">' +
      '<div class="card">' +
      '<img src="' + cat.image + '" class="card-img-top" alt="' + cat.name + '" style="height:200px; object-fit:cover;">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + cat.name + '</h5>' +
      '<button class="pink btn btn-lg" onclick="deleteCategory(' + i + ')">Delete</button>' +
      '<a href="resDashboard.html?category=' + encodeURIComponent(cat.name) + '" class="pink btn btn-lg ms-2">Items</a>' +
      '</div>' +
      '</div>' +
      '</div>';
  }
}

function createCategory() {
  var name = categoryInput.value.trim();
  if (!name) {
    Swal.fire('Error', 'Category name is required', 'error');
    return;
  }

  for (var j = 0; j < categories.length; j++) {
    if (categories[j].name.toLowerCase() === name.toLowerCase()) {
      Swal.fire('Error', 'Category already exists!', 'error');
      return;
    }
  }

  var file = imageInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      saveCategory(name, e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveCategory(name, '');
  }
}

function saveCategory(name, image) {
  categories.push({ name: name, image: image });
  localStorage.setItem('categories', JSON.stringify(categories));
  categoryInput.value = '';
  imageInput.value = '';
  imgPreview.src = '';
  imgPreview.style.display = 'none';
  renderCategories();
  Swal.fire('Success', 'Category added successfully', 'success');
}

function deleteCategory(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Delete category "' + categories[index].name + '"?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
  }).then(function (result) {
    if (result.isConfirmed) {
      categories.splice(index, 1);
      localStorage.setItem('categories', JSON.stringify(categories));
      renderCategories();
      Swal.fire('Deleted!', 'Category has been deleted.', 'success');
    }
  });
}

function logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout'
  }).then(function (result) {
    if (result.isConfirmed) {
      localStorage.removeItem('shopName');
      window.location.href = 'index.html';
    }
  });
}
