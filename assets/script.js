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