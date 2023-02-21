var initialsForm = document.getElementById('initials-form');
var initialsInput = document.getElementById('initials');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];




initialsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var initials = initialsInput.value;
    var scoreData = {
      initials: initials,
      score: score,
      
    };
    window.location.href = 'HighScores.html';
    console.log('');


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
