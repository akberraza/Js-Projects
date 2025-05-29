var questions = [
  {
    question: "What does HTML stand for?",
    option1: "Hyperlinks and Text Markup Language",
    option2: "Hypertext Markup Language",
    option3: "Home Tool Markup Language",
    correctOption: "Hypertext Markup Language",
  },
  {
    question: "Who is making the Web standards?",
    option1: "Google",
    option2: "The World Wide Web Consortium",
    option3: "Microsoft",
    correctOption: "The World Wide Web Consortium",
  },
  {
    question: "What is the purpose of CSS?",
    option1: "To structure a webpage",
    option2: "To style a webpage",
    option3: "To handle databases",
    correctOption: "To style a webpage",
  },
  {
    question: "What is Bootstrap?",
    option1: "A programming language",
    option2: "A design framework",
    option3: "A type of database",
    correctOption: "A design framework",
  },
  {
    question: "Which tag is used to insert an image in HTML?",
    option1: "<img>",
    option2: "<image>",
    option3: "<pic>",
    correctOption: "<img>",
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    option1: "<heading>",
    option2: "<h6>",
    option3: "<h1>",
    correctOption: "<h1>",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    option1: "<linebreak>",
    option2: "<br>",
    option3: "<break>",
    correctOption: "<br>",
  },
  {
    question: "What is the correct HTML for adding a background color?",
    option1: '<body bg="yellow">',
    option2: "<background>yellow</background>",
    option3: '<body style="background-color:yellow;">',
    correctOption: '<body style="background-color:yellow;">',
  },
  {
    question: "Which CSS property is used to change text color?",
    option1: 'font',
    option2: "color",
    option3: 'text',
    correctOption: 'color',
  },
  {
    question: "Which attribute is used in HTML to provide alternative text for an image?",
    option1: 'title',
    option2: "alt",
    option3: 'src',
    correctOption: 'alt',
  }
]; 

var getQues = document.getElementById("ques");
var getOption1 = document.getElementById("opt1");
var getOption2 = document.getElementById("opt2");
var getOption3 = document.getElementById("opt3");
var getInputs = document.getElementsByTagName("input");
var getBtn = document.getElementById("btn");
var getTimer = document.getElementById("timer");
var getQuestionNumber = document.getElementById("question-number");

var index = 0;
var score = 0;
var timerInterval;
var autoNextTimeout;

function startTimer() { 
  var timeLeft = 10;
  getTimer.innerText = "Time left: " + timeLeft + "s";

  timerInterval = setInterval(function () {
    timeLeft--;
    getTimer.innerText = "Time left: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}


function loadQuestion() {
  clearInterval(timerInterval);
  clearTimeout(autoNextTimeout);

  if (index >= questions.length) {
    showResult();
    return;
  }

  for (var i = 0; i < getInputs.length; i++) {
    getInputs[i].checked = false;
    getInputs[i].parentElement.classList.remove("active");
    getInputs[i].parentElement.querySelector("i").className = "far fa-circle";
  }

  var q = questions[index];
  getQues.innerText = q.question;
  getOption1.innerText = q.option1;
  getOption2.innerText = q.option2;
  getOption3.innerText = q.option3;

  getQuestionNumber.innerText = `Question ${index + 1} / ${questions.length}`;
  getBtn.disabled = true;

  startTimer();

  autoNextTimeout = setTimeout(function () {
    checkAnswer();
    index++;
    loadQuestion();
  }, 10000);
}

function enableNext() {
  getBtn.disabled = false;
  for (var i = 0; i < getInputs.length; i++) {
    getInputs[i].parentElement.classList.remove("active");
    getInputs[i].parentElement.querySelector("i").className = "far fa-circle";

    if (getInputs[i].checked) {
      getInputs[i].parentElement.classList.add("active");
      getInputs[i].parentElement.querySelector("i").className = "fas fa-check-circle";
    }
  }
}

function next() {
  clearInterval(timerInterval);
  clearTimeout(autoNextTimeout);
  checkAnswer();
  index++;
  loadQuestion();
}

function checkAnswer() {
  for (var i = 0; i < getInputs.length; i++) {
    if (getInputs[i].checked) {
      var selectedText = document.getElementById("opt" + (i + 1)).innerText;
      if (selectedText === questions[index].correctOption) {
        score++;
      }
      break;
    }
  }
}

function showResult() {
  clearInterval(timerInterval);
  clearTimeout(autoNextTimeout);

  var percentage = (score / questions.length) * 100;
  var status = percentage >= 75 ? "Pass" : "Fail";

  Swal.fire({
    title: `Quiz Ended!`,
    html: `Your Score: <strong>${score}/${questions.length}</strong> <br> Percentage: <strong>${percentage}%</strong>`,
    icon: status === "Pass" ? "success" : "error",
    showCancelButton: true,
    confirmButtonText: "Restart",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      index = 0;
      score = 0;

      setTimeout(() => {
        loadQuestion();
      }, 300);
    } else {
      Swal.fire("Quiz Cancelled", "", "info");
    }
  });
}

// Start quiz initially
loadQuestion();
