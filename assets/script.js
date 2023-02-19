var startButton = document.getElementById('start-btn');
var questionBox = document.getElementById('question-box');
var answerButtonBox = document.getElementById('answer-button-box');
var quizBox = document.getElementById('quiz-box');
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var answerResult = document.createElement('p');

var questions = [{question: 'Commonly used data types DO NOT Include:', 
     answers: [        
        { text: 'Strings', correct: false },        
        { text: 'Booleans', correct: false },        
        { text: 'Alerts', correct: true },        
        { text: 'Numbers', correct: false }, ]
    },
    {
      question: 'The condition in an if/else statement is enclosed with ________.',
      answers: [
        { text: 'quotes', correct: false },
        { text: 'curly brackets', correct: true },
        { text: 'parenthesis', correct: false },
        { text: 'square brackets', correct: false },
      ]
    },
    {
      question: 'Arrays in JavaScript can be used to store _______.',
      answers:[
        {text: 'numbers and strings', correct: false},
        {text: 'other arrays', correct: false},
        {text: 'booleans', correct: false},
        {text: 'all of the above',correct: true},
      ] 
    },
    {question:'String values must be enclosed within _____ when being assigned to variables',
     answers:[
        {text: 'Commas',correct: false},
        {text: 'Curly Brackets',correct: false},
        {text: 'Quotes',correct: true},
        {text: 'Parenthesis',correct: false},
     ]},
     {question:'A very useful tool used during development and debugging for printing content to the debugger is:',
     answers:[
        {text: 'JavaScript',correct:false},
        {text: 'Terminal/Bash',correct:false},
        {text: 'For Loops',correct: false},
        {text: 'Console.log',correct: true},
     ]},
  ];

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.classList.add('hide');
  quizBox.classList.remove('hide');
  setNextQuestion();
  showTimer();
}

function setNextQuestion() {
  resetState();
  questionBox.innerText = questions[currentQuestionIndex].question;
  showQuestion(questions[currentQuestionIndex]);
  quizBox.appendChild(answerResult);
}

function showQuestion(question) {
  questionBox.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer-btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonBox.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  while (answerButtonBox.firstChild) {
    answerButtonBox.removeChild(answerButtonBox.firstChild);
  }
}

function selectAnswer(event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(selectedButton, correct);
  Array.from(answerButtonBox.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct) {
    score++;
    answerResult.innerText = "Correct!";
  } else {
    timeLeft -= 10;
    answerResult.innerText = "Wrong!";
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    endQuiz();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function endQuiz() {
    clearInterval(timerId);
    while (answerButtonBox.firstChild) {
      answerButtonBox.removeChild(answerButtonBox.firstChild);
    }
    var scoreDiv = document.createElement('div');
    var scoreLabel = document.createElement('p');
    scoreLabel.innerText = "Your final score is: " + score;
    var initialForm = document.createElement('form');
    initialForm.innerHTML = `
      <label for="initials">Enter your initials:</label>
      <input type="text" id="initials" name="initials"><br><br>
      <input type="submit" value="Submit">
    `;
    initialForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var initials = document.getElementById('initials').value;
      saveScore(initials, score);
    });
    scoreDiv.appendChild(scoreLabel);
    scoreDiv.appendChild(initialForm);
    quizBox.appendChild(scoreDiv);
  }
  
  function saveScore(initials, score) {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({initials: initials, score: score});
    highScores.sort(function(a, b){return b.score - a.score});
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
  }
  
