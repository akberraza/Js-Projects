var container = document.getElementById("cards");

function Car(name, Model, company, price, image) {
    this.name = name;
    this.Model = Model;
    this.company = company;
    this.image = image;
    this.price = price;
}

var s1 = new Car("Toyota Corolla Altis", "1.8", "Toyota", "Rs. 6,169,000", "images/Toyota Corolla Altis.png");
var s2 = new Car("Honda Civic", "RS Turbo 1.5L", "Honda", "Rs. 8,329,000", "images/Honda Civic.jpg");
var s3 = new Car("Suzuki Swift", "GLX CVT", "Suzuki", "Rs. 5,429,000", "images/Suzuki Swift.jpg");
var s4 = new Car("Hyundai Elantra", "2.0 GLS", "Hyundai", "Rs. 7,180,000", "images/Hyundai Elantra.jpg");
var s5 = new Car("Kia Sportage", "AWD", "Kia Motors", "Rs. 8,720,000", "images/Kia Sportage.jpeg");
var s6 = new Car("MG HS", "1.5T Trophy", "MG Motors", "Rs. 4,979,000", "images/MG HS.png");
var s7 = new Car("Changan Alsvin", "1.5 Lumiere", "Changan", "Rs. 8,899,000", "images/Changan Alsvin.jpg");
var s8 = new Car("Proton Saga", "1.3L Ace AT", "Proton", "Rs. 3,949,000", "images/Proton Saga.jpg");
var s9 = new Car("Nissan Sunny", "1.5L SV", "Nissan", "Rs. 4,799,000", "images/Nissan Sunny.webp");
var s10 = new Car("Ford EcoSport", "Titanium 1.5L", "Ford", "Rs. 5,999,000", "images/Ford EcoSport.webp");
var s11 = new Car("Toyota Yaris ", "1.3L ATIV CVT", "Toyota", "PKR 5,604,000", "images/Toyota Yaris.jpg");
var s12 = new Car("Hyundai Tucson Hybrid", "Tucson Hybrid (2025)", "Hyundai", "PKR 11,999,000 ", "images/Hyundai Tucson.jpg");

var CarArray = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10,s11,s12];


var html = '<div class="container"><div class="row">';

for (var i = 0; i < CarArray.length; i++) {
  var s = CarArray[i];

  html += `
    <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div class="card h-100 shadow-sm border-0">
        <div class="img-hover-zoom">
          <img src="${s.image}" class="card-img-top" alt="${s.name}" style="height: 200px; object-fit: cover;">
        </div>
        <div class="card-body">
          <h5 class="card-title text-primary">${s.name}</h5>
          <p class="card-text mb-1"><strong>Model:</strong> ${s.Model}</p>
          <p class="card-text mb-1"><strong>Company:</strong> ${s.company}</p>
          <p class="card-text"><strong>Price:</strong> ${s.price}</p>
          <a href="#" class="btn btn-outline-primary btn-sm mt-2">View Details</a>
        </div>
        <div class="card-footer bg-transparent border-0 text-right">
          <span class="badge badge-info">Available</span>
        </div>
      </div>
    </div>
  `;
}

html += '</div></div>';
container.innerHTML = html;
