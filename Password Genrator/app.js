var capital = "ABCEFGHIJKLMNOPQRSTUVWXYZ";
var small = "abcdefghijklmnopqrstuvwxyz";
var countaing = 1234567890;
var speical = "@!$%&";
var marge = capital + small + countaing + speical
var password = "";

for(var i = 0; i<=10; i++){
  password += (marge[Math.floor(Math.random() * marge.length)])
}
document.write(`<h1>Password Generator</h1> <br> <h2>1. ${password}</h2>`)