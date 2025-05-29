var btn = document.getElementById("btn");
var img = document.getElementById("image");
btn.addEventListener("click",change);

function change(){
    if(btn.textContent.includes("on")){
        img.src = "https://i.pinimg.com/236x/9d/8c/d0/9d8cd0de1fdf89406909485b66f80328.jpg";
        btn.style.backgroundColor = "green";
        btn.textContent = "Turn off";
        img.setAttribute('height','300px')
    } 
    else{
        img.src = "https://i.pinimg.com/236x/62/c5/8b/62c58b85f874e281dec75955a6372694.jpg";
        btn.style.backgroundColor = "yellow";
        btn.textContent = "Turn on"
    }
}


