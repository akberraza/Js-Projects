function updateClock() {
    var now = new Date();
  
    var second = now.getSeconds();
    var minute = now.getMinutes();
    var hour = now.getHours();
  
    var secondDeg = second * 6;
    var minuteDeg = minute * 6 + second * 0.1;
    var hourDeg = ((hour % 12) / 12) * 360 + (minute / 60) * 30;
  
    document.getElementById('second').style.transform = `rotate(${secondDeg}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('hour').style.transform = `rotate(${hourDeg}deg)`;
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  