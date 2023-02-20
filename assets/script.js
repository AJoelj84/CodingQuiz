// Main html page variables
var startBtn = document.getElementById('start-btn');
var quizBox = document.getElementById('quiz-box');
var questionBox = document.getElementById('question-box');
var answerBtn = document.getElementById('answer-button-box');
var timerBox = document.getElementById('timer');

// Secondary html page variables?
var finalScoreBox = document.getElementById("final-score");
var scoreDisplay = document.getElementById("score");
var initialsForm = document.getElementById("initials-form");
var initialsInput = document.getElementById("initials");

// third html page variables?
var highScoresBox = document.getElementById("high-scores");
var highScoresTable = document.getElementById("high-scores-table");
var goBackBtn = document.getElementById("go-back-btn");
var clearScoresBtn = document.getElementById("clear-scores-btn");

// Questions Array
var questions = [
    {question:'Commonly used Data types DO NOT include?',
        answers: ['Alerts','Boolean','Numbers','Strings'],
        correctAnswer: 'Alerts'
    },

    {question:'A very useful tool during development and debugging for printing content to the debugger is?',
        answers:['JavaScript','Terminal/Bash','For Loops','Console Log'],
        correctAnswer:'Console Log'
    },

    {question:'Arrays in JavaScript can be used to store?',
    answers:['Numbers and Strings','Other Arrays', 'Booleans','All of the Above'],
    correctAnswer:'All of the Above'
    },


    {question:'The condition in an if/else statement is enclosed with ____.',
    answers:['Quotes','Curly Brackets','Parenthesis','Square Brackets'],
    correctAnswer:'Parenthesis'
    },

    {question:'String values must be enclosed within ____ when being assigned to variables.',
    answers:['Commas','Curly Brackets','Quotes','Parenthesis'],
    correctAnswer:'Quotes'
    },
];

// Defining the state of the quiz variables
var currentQuestion = 0;
var timeLeft = 60;
var score = 0;
var timerID;
startButton.addEventListener("click", startQuiz);

// Define the startQuiz function
function startQuiz() {
  startBtn.classList.add("hide");
  timerBox.textContent = timeLeft;
  quizBox.classList.remove("hide");
  timerId = setInterval(updateTimer, 1000);
  askQuestion();
}

// Define the askQuestion function
function askQuestion() {
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }
  var question = quizData[currentQuestion];
  questionBox.textContent = question.question;
  answerButtonBox.innerHTML = "";
  for (let answer of question.answers) {
    var button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", function() {
      handleAnswer(answer, question.correctAnswer);
    });
    answerButtonBox.appendChild(button);
  }
}
// Function to handle an answer
function handleAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
      score += 20;
      showAlert("Correct!");
    } else {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      showAlert("Incorrect!");
    }
    currentQuestion++;
    askQuestion();
  }
  
  // Function to show a message to the user
  function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    answerButtonBox.appendChild(alertBox);
    setTimeout(function() {
      alertBox.remove();
    }, 1000);
  }
 
// Function to update the timer
function updateTimer() {
    timeLeft--;
    if (timeLeft < 0) {
      timeLeft = 0;
      endQuiz();
    }}
    timerBox.textContent = timeLeft;




