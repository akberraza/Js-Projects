var months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate(){
    var today = new Date();
    var inputDate = new Date(document.getElementById("date-input").value);
    var birthMonth,birthDate,birthYear;
    var birthDetail = {
     date : inputDate.getDate(),
     month:inputDate.getMonth()+1,
     year:inputDate.getFullYear()
    }
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth()+1;
    var currentDate = today.getDate();

    leapChecker(currentYear)

    if(
        birthDetail.year > currentYear ||
        (birthDetail.month > currentMonth && 
         birthDetail.year == currentYear) ||
         (birthDetail.date > currentDate &&
         birthDetail.month == currentMonth &&
         birthDetail.year == currentYear
         )
    ){
        alert("Not Born Yet");
        displayResult("-","-","-")
        return;
    }
    birthYear = currentYear - birthDetail.year;

    if(currentMonth >= birthDetail.month){
        birthMonth = currentMonth - birthDetail.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetail.month;
    }

    if(currentDate >=  birthDetail.date){
        birthDate = currentDate - birthDetail.date;
    }
    else{
        birthMonth--;
        var days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetail.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
}
displayResult(birthDate,birthMonth,birthYear)
}


function displayResult(bDate,bMonth,bYear){
document.getElementById("years").textContent = bYear;
document.getElementById("months").textContent = bMonth;
document.getElementById("days").textContent = bDate; 
}

function leapChecker(year){
    if(year % 4  == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}