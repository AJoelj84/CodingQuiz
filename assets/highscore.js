// Get the table and the tbody element
var highScoresTable = document.getElementById('high-scores-table');
var highScoresTableBody = highScoresTable.getElementsByTagName('tbody')[0];

// Retrieve the scores from local storage
var scores = JSON.parse(localStorage.getItem('scores')) || [];

// Add each score to the table
scores.forEach(function(score) {
  var row = highScoresTableBody.insertRow();
  var initialsCell = row.insertCell();
  var scoreCell = row.insertCell();
  var dateCell = row.insertCell();
  initialsCell.appendChild(document.createTextNode(score.initials));
  scoreCell.appendChild(document.createTextNode(score.score));
  dateCell.appendChild(document.createTextNode(score.date));
});