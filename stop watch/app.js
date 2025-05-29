var timer;
var milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
var running = false;

function startTimer(){
    if(!running){
        running = true;
        timer = setInterval(updateTime,10);
        document.getElementById("startBtn").style.display = "none";
        document.getElementById("stopBtn").style.display = "inline";
        document.getElementById("resatBtn").style.display = "inline";
    }
}

function stopTimer(){
    clearInterval(timer);
    running = false;
    document.getElementById("stopBtn").style.display = "none";
    document.getElementById("startBtn2").style.display = "inline";
    document.body.style.backgroundColor = "#ffeed9"
    document.getElementById("startBtn2").style.backgroundColor = "#ffcd6c"
    document.getElementById("resatBtn").style.backgroundColor = "#ffcd6c"
    document.getElementById("outer-cicle").style.backgroundColor = "#f0e0cb";
    document.getElementById("inner-circle").style.backgroundColor = "#ffeed9"
}

function startTimer2(){
    if(!running){
        running = true; 
        timer = setInterval(updateTime,10);
        document.getElementById("stopBtn").style.display = "inline";
        document.getElementById("startBtn2").style.display = "none";
        document.body.style.backgroundColor = "#e5edff"
        document.getElementById("startBtn2").style.backgroundColor ="#0b57d0";
        document.getElementById("resatBtn").style.backgroundColor ="#0b57d0";
         document.getElementById("outer-cicle").style.backgroundColor = " #c7dbff";
         document.getElementById("inner-circle").style.backgroundColor = "#e5edff";
    }
}

function resatTimer(){
      clearInterval(timer);
      running = false;
      milliseconds  = 0;
      seconds  = 0;
      minutes = 0;
      hours = 0;
      document.getElementById("stopBtn").style.display = "none";
      document.getElementById("resatBtn").style.display = "none";
      document.getElementById("startBtn2").style.display = "none";
    document.getElementById("startBtn").style.display = "inline";
    document.getElementById("display").innerHTML = "00:00:00:000";
    document.body.style.backgroundColor = "#e5edff"
    document.getElementById("startBtn2").style.backgroundColor ="#0b57d0";
    document.getElementById("resatBtn").style.backgroundColor ="#0b57d0";
     document.getElementById("outer-cicle").style.backgroundColor = " #c7dbff";
     document.getElementById("inner-circle").style.backgroundColor = "#e5edff";

}

function updateTime(){
    milliseconds += 10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds ==  60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++
            }
        }
    }

    var displayTime =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds )+ ":" +
    (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds): milliseconds);
    document.getElementById("display").innerHTML = displayTime
}