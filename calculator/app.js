function btnClick(a){
    var gateinp = document.getElementById("inp");

    gateinp.value = gateinp.value + a
}

function eq(){
    var gateinp = document.getElementById("inp");
    gateinp.value = eval(gateinp.value);
}

function clrall(){
    var gateinp = document.getElementById("inp");
    gateinp.value = '';
}

function clr(){
    var gateinp = document.getElementById("inp")
     gateinp.value = gateinp.value.slice(0,-1);

}