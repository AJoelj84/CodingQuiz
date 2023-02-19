var startButton = document.getElementById('start-btn');
var questionBox = document.getElementById('question-box');
var answerButtonBox = document.getElementById('answer-button-box');
var quizBox = document.getElementById('quiz-box');
var currentQuestion = 0;
var score = 0;
var timeLeft = 60;

var questions = [ { question: 'Commonly used data types do not include?',  
                    answer: [strings, boolean, numbers, alerts]},
                ];



startButton.addEventListener('click', startQuiz);  

function startQuiz() {
    startButton.classList.add('hide');
    quizContainer.classList.remove('hide');
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionContainer.innerText = question.question;
    question.answers.forEach(answer => {
      var button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('answer-btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsContainer.appendChild(button);
    });
  }

  




