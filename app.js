/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;

let firstGame = true;

if (firstGame) {
  newGame();
}

function newGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  //1. random number

  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. display the result

  const diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // 3. update round score if not a 1

  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    // Next player

    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  // add current score to global score

  scores[activePlayer] += roundScore;

  // upate UI

  document.querySelector('#score-' + activePlayer).textContent =
    scores[activePlayer];

  // check if player won the game

  if (scores[activePlayer] >= 100) {
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.add('winner');
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.remove('active');
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', function() {
  firstGame = false;
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.remove('winner');
  document.getElementById('name-' + activePlayer).textContent =
    'Player-' + (activePlayer + 1);
  newGame();
});
