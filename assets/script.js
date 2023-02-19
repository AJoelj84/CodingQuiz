var startButton = document.getElementById('start-btn');
var questionBox = document.getElementById('question-box');
var answerButtonBox = document.getElementById('answer-button-box');
var quizBox = document.getElementById('quiz-box');
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;

var questions = [
    {
      question: 'Commonly used data types DO NOT Include:',
      answers: [
        { text: 'Strings', correct: false },
        { text: 'Booleans', correct: false },
        { text: 'Alerts', correct: true },
        { text: 'Numbers', correct: false },
      ]
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
    }
  ];



startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.classList.add('hide');
  quizBox.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
    resetState();
    questionBox.innerText = questions[currentQuestionIndex].question;
    showQuestion(questions[currentQuestionIndex]);
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
    questionBox.innerText = correct ? "Correct!" : "Wrong!";
    if (correct) {
      score++;
    } else {
      timeLeft -= 10;
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
      questionBox.innerText = "Correct!";
    } else {
      element.classList.add('wrong');
      questionBox.innerText = "Wrong!";
    }
  }
  

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function endQuiz() {
    clearInterval(timerId);
    questionBox.innerText = "Quiz ended. Your score is " + score;
  }