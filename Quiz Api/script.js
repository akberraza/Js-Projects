let questions = [];
let currentIndex = 0;

let decodeHTML = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

let fetchQuestions = () => {
  fetch('https://opentdb.com/api.php?amount=10&category=9')
    .then(res => res.json())
    .then(data => {
      questions = data.results;
      showQuestion();
    });
}

let showQuestion = () => {
  if (currentIndex >= questions.length) {
    document.querySelector('#question').innerText = 'Quiz Completed!';
    document.querySelector('#answers').innerHTML = '';
    return;
  }

  const q = questions[currentIndex];
  const allAnswers = [...q.incorrect_answers];
  const correct = q.correct_answer;
  allAnswers.splice(Math.floor(Math.random() * 4), 0, correct);

  document.querySelector('#question').innerText = decodeHTML(q.question);

  const answersDiv = document.querySelector('#answers');
  answersDiv.innerHTML = '';

  allAnswers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerText = decodeHTML(answer);
    btn.onclick = () => {
      currentIndex++;
      showQuestion();
    };
    answersDiv.appendChild(btn);
  });
}

fetchQuestions();
