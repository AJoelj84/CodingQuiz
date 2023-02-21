var startButton = document.getElementById('start-btn');
var questionBox = document.getElementById('question-box');
var answerButtonBox = document.getElementById('answer-button-box');
var quizBox = document.getElementById('quiz-box');
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var answerResult = document.createElement('p');
var finalScoreElement = document.getElementById('final-score');
var initialsForm = document.getElementById('initials-form');
var initialsInput = document.getElementById('initials');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var questions = [
    {question: 'Commonly used data types DO NOT Include:', 
     answers: [        
        { text: 'Strings', correct: false },        
        { text: 'Booleans', correct: false },        
        { text: 'Alerts', correct: true },        
        { text: 'Numbers', correct: false }, ]
    },
    {question: 'The condition in an if/else statement is enclosed with ________.',
      answers: [
        { text: 'quotes', correct: false },
        { text: 'curly brackets', correct: true },
        { text: 'parenthesis', correct: false },
        { text: 'square brackets', correct: false },
      ]
    },
    {question: 'Arrays in JavaScript can be used to store _______.',
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
     ]
    },
     {question:'A very useful tool used during development and debugging for printing content to the debugger is:',
     answers:[
        {text: 'JavaScript',correct:false},
        {text: 'Terminal/Bash',correct:false},
        {text: 'For Loops',correct: false},
        {text: 'Console.log',correct: true},
     ]
    }];

  startButton.addEventListener('click', startQuiz);
  
  function startQuiz() {
    startButton.classList.add('hide');
    quizBox.classList.remove('hide');
    setNextQuestion();
    showTimer();
  }
  
  function setNextQuestion() {
    if (currentQuestionIndex === questions.length) {
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
      score++;
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
      document.getElementById('score').innerText = score;
      endQuiz();
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
    var timerElement = document.getElementById('timer');
    var timerInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz(){
    window.location.href = "Score.html";

  }


  initialsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var initials = initialsInput.value;
    var scoreData = {
      initials: initials,
      score: score
    };
    highScores.push(scoreData);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    finalScoreElement.classList.add('hide');
    document.getElementById('high-scores-table').innerHTML = '';
    highScores.forEach(function(scoreData) {
      var row = document.createElement('tr');
      var initialsCell = document.createElement('td');
      initialsCell.textContent = scoreData.initials;
      var scoreCell = document.createElement('td');
      scoreCell.textContent = scoreData.score;
      row.appendChild(initialsCell);
      row.appendChild(scoreCell);
      document.getElementById('high-scores-table').appendChild(row);
    });
    document.getElementById('high-scores').classList.remove('hide');
  });
