let quizData = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedAnswer = "";

const fetchQuiz = () => {
  fetch('https://opentdb.com/api.php?amount=10')
    .then(res => res.json())
    .then(data => {
      quizData = data.results;
      currentIndex = 0;
      score = 0;
      document.getElementById('scoreBox').innerText = `Score: ${score}`;
      showQuestion();
    });
};

const showQuestion = () => {
  clearInterval(timer);
  timeLeft = 10;
  selectedAnswer = "";

  const q = quizData[currentIndex];
  const options = [...q.incorrect_answers, q.correct_answer];

  document.getElementById('questionBox').style.display = 'block';
  document.getElementById('optionsBox').style.display = 'block';
  document.getElementById('timer').innerText = timeLeft;
  document.getElementById('scoreBox').style.display = 'block';

  document.getElementById('questionBox').innerHTML = q.question;
  document.getElementById('optionsBox').innerHTML = '';
  document.getElementById('questionCount').innerText = `Question ${currentIndex + 1} of ${quizData.length}`;
  document.getElementById('nextBtn').disabled = true;

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(btn, q.correct_answer);
    document.getElementById('optionsBox').appendChild(btn);
  });

  startTimer();
};

const selectAnswer = (btn, correct) => {
  selectedAnswer = btn.innerText;
  document.querySelectorAll('#optionsBox button').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('nextBtn').disabled = false;
};

const startTimer = () => {
  document.getElementById('timer').innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      goToNext();
    }
  }, 1000);
};

const goToNext = () => {
  clearInterval(timer);

  const correct = quizData[currentIndex].correct_answer;
  if (selectedAnswer === correct) {
    score++;
  }

  document.getElementById('scoreBox').innerText = `Score: ${score}`;
  currentIndex++;

  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
};

const endQuiz = () => {
  document.getElementById('questionBox').style.display = 'none';
  document.getElementById('optionsBox').style.display = 'none';
  document.getElementById('timer').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('questionCount').style.display = 'none';
  document.getElementById('scoreBox').style.display = 'none';
  document.getElementById('endBox').style.display = 'block';
  document.getElementById('finalScore').innerText = `Your Final Score: ${score} out of ${quizData.length}`;
};

const restartQuiz = () => {
  document.getElementById('endBox').style.display = 'none';
  document.getElementById('timer').style.display = 'block';
  document.getElementById('nextBtn').style.display = 'inline-block';
  document.getElementById('questionCount').style.display = 'block';
  fetchQuiz();
};

const cancelQuiz = () => {
  const questionBox = document.getElementById('questionBox');
  questionBox.style.display = 'block'; 
  questionBox.innerHTML = `<h2>Quiz Cancelled</h2>`;

  document.getElementById('optionsBox').innerHTML = '';
  document.getElementById('timerBox').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('questionCount').style.display = 'none';
  document.getElementById('scoreBox').style.display = 'none';
  document.getElementById('endBox').style.display = 'none';
};


fetchQuiz();
