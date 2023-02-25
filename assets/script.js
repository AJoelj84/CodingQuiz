var startButton = document.getElementById('start-btn');
var questionBox = document.getElementById('question-box');
var pageStart = document.getElementById('page');
var answerButtonBox = document.getElementById('answer-button-box');
var quizBox = document.getElementById('quiz-box');
var finalScoreElement = document.getElementById('final-score');
// Working Section to integrate High Scores
var backBtn = document.getElementById('goback');
var highScores = document.getElementById('high-scores');
var highScoresTable = document.getElementById('high-scores-table');
var highScoresTableBody = highScoresTable.getElementsByTagName('tbody')[0];
var scores = JSON.parse(localStorage.getItem('scores')) || [];
var initialsForm = document.getElementById('initials-form');
initialsForm.addEventListener('submit', handleFormSubmit);
// Below is previously working code
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var answerResult = document.createElement('p');
var timerInterval;


var questions = [
    {question: 'Commonly used data types DO NOT Include:', 
     answers: [        
        { text: '1. Strings', correct: false },        
        { text: '2. Booleans', correct: false },        
        { text: '3. Alerts', correct: true },        
        { text: '4. Numbers', correct: false }, ]
    },
    {question: 'The condition in an if/else statement is enclosed with ________.',
      answers: [
        { text: '1. Quotes', correct: false },
        { text: '2. Curly brackets', correct: true },
        { text: '3. Parenthesis', correct: false },
        { text: '4. Square brackets', correct: false },
      ]
    },
    {question: 'Arrays in JavaScript can be used to store _______.',
      answers:[
        {text: '1. Numbers and Strings', correct: false},
        {text: '2. Other Arrays', correct: false},
        {text: '3. Booleans', correct: false},
        {text: '4. All of the above',correct: true},
      ] 
    },
    {question:'String values must be enclosed within _____ when being assigned to variables',
     answers:[
        {text: '1. Commas',correct: false},
        {text: '2. Curly Brackets',correct: false},
        {text: '3. Quotes',correct: true},
        {text: '4. Parenthesis',correct: false},
     ]
    },
     {question:'A very useful tool used during development and debugging for printing content to the debugger is:',
     answers:[
        {text: '1. JavaScript',correct:false},
        {text: '2. Terminal/Bash',correct:false},
        {text: '3. For Loops',correct: false},
        {text: '4. Console.log',correct: true},
     ]
    }];

  startButton.addEventListener('click', startQuiz);
  
  function startQuiz() {
    startButton.classList.add('hide');
    pageStart.classList.add('hide');
    quizBox.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    setNextQuestion();
    showTimer();
  }
  
  function setNextQuestion() {
    if (currentQuestionIndex === questions.length) {
      clearInterval(timerInterval);
      quizBox.classList.add('hide');
      finalScoreElement.classList.remove('hide');
      document.getElementById('score').textContent = score;
      return;
    }
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
      score+=20;
      answerResult.innerText = "Correct!";
    } else {
      timeLeft -= 10;
      answerResult.innerText = "Incorrect!";
    }
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      setNextQuestion();
    } else {
      clearInterval(timerInterval);
      finalScoreElement.classList.remove('hide');
      quizBox.classList.add('hide');
      document.getElementById('score').innerText = score;
      // endQuiz();
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('incorrect');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
  }
  
  function showTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timer').textContent = 'Time left: ' + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      setNextQuestion();
    }
  }, 1000);
}
// High Scores Section Below
function handleFormSubmit(event) {
  finalScoreElement.classList.add('hide');
  highScores.classList.remove('hide');

  event.preventDefault();
  var initialsInput = document.getElementById('initials');
  var initials = initialsInput.value.trim();
  if (initials !== '') {
    var newScore = {initials: initials, score: score };
    scores.push(newScore);
    localStorage.setItem('scores', JSON.stringify(scores));
  }
}

backBtn.addEventListener('click',function(){
  location.reload();
});


var savedScores = JSON.parse(localStorage.getItem('scores'));
var output = document.getElementById('output');

var initialsAndScores = "";

for (var i = 0; i < savedScores.length; i++) {
  var initials = savedScores[i].initials;
  var score = savedScores[i].score;
  initialsAndScores += initials + " - " + score + " ";
}

output.innerHTML = initialsAndScores;

console.log(initialsAndScores);


var clearScoresButton = document.getElementById("clear-scores-btn");

clearScoresButton.addEventListener("click", function () {
  localStorage.clear();
});