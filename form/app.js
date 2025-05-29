var arr = [];

var user = localStorage.getItem("user")

if(user !== null){
   arr = JSON.parse(user)
}

function signin(){
    var getName = document.querySelector("#name");
    var getEmail = document.querySelector("#email");
    var getPassword = document.querySelector("#Password");

    var obj = {
        name: getName.value,
        email: getEmail.value,
        password: getPassword.value
    }

    arr.push(obj);
    localStorage.setItem("user",JSON.stringify(arr));

    getName.value = "";
    getEmail.value = "";
    getPassword.value = ""
}

function login(){
    var getEmail = document.querySelector("#email");
    var getPassword = document.querySelector("#Password");

    var filterUser = arr.filter(function(data){
        return data.email == getEmail.value && data.password == getPassword.value
    })

    if(filterUser.length){
        alert("User login Successfully!")
    }
    else{
        alert("email or password inCorrect!")
    }

    getEmail.value = "";
    getPassword.value = "";
}