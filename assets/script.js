var startButton = document.getElementById('start-btn');
var questionBox = document.getElementById('question-box');
var answerButtonBox = document.getElementById('answer-button-box');
var quizBox = document.getElementById('quiz-box');
var finalScoreElement = document.getElementById('final-score');
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var answerResult = document.createElement('p');
var timerInterval;


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
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    setNextQuestion();
    showTimer();
  }
  
  function setNextQuestion() {
    if (currentQuestionIndex === questions.length) {
      clearInterval(timerInterval); // clear the timer
      quizBox.style.display = 'none'; // hide the quiz-box section
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
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timer').textContent = 'Time left: ' + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      setNextQuestion();
    }
  }, 1000);
}
