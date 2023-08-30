"use strict";

var statusDisplay = document.querySelector(".game-notification"),
    gameState = ['', '', '', '', '', '', '', '', ''],
    winnings = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    winMessage = function winMessage() {
  return "".concat(currentPlayer, " Wins");
},
    drawMessage = function drawMessage() {
  return 'Draw';
},
    currentPlayerTurn = function currentPlayerTurn() {
  return " ".concat(currentPlayer, "'s turn");
},
    Xpoints = function Xpoints() {
  return "X ".concat(right);
},
    Opoints = function Opoints() {
  return "O ".concat(left);
},
    countRight = document.querySelector('.right'),
    countLeft = document.querySelector('.left');

var gameActive = true,
    currentPlayer = 'O',
    left = 0,
    right = 0,
    game = 0;

function main() {
  handleStatusDisplay(currentPlayerTurn());
  listeners();
  Xpoints();
  Opoints();
}

function handleStatusDisplay(message) {
  statusDisplay.innerHTML = message;
}

function listeners() {
  document.querySelector(".game-container").addEventListener('click', handleCellClick);
  document.querySelector(".reset").addEventListener('click', handleRestartGame);
}

function handleRestartGame() {
  gameActive = true;
  game += 1;

  if (game % 2 == 0) {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }

  restartGameState();
  handleStatusDisplay(currentPlayerTurn());
  document.querySelectorAll('.cell').forEach(function (cell) {
    return cell.innerHTML = '';
  });
}

function handleCellClick(clickedEvent) {
  var clickedCell = clickedEvent.target;

  if (clickedCell.classList.contains('cell')) {
    var clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }

  console.log(clickedCell);
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
}

function handleResultValidation() {
  var roundWon = false;

  for (var _i = 0; _i < winnings.length; _i++) {
    var winCondition = winnings[_i];
    var position1 = gameState[winCondition[0]],
        position2 = gameState[winCondition[1]],
        position3 = gameState[winCondition[2]];

    if (position1 === '' || position2 === '' || position3 == '') {
      continue;
    }

    if (position1 === position2 && position2 === position3) {
      roundWon = true;
      count();
      break;
    }
  }

  if (roundWon) {
    handleStatusDisplay(winMessage());
    gameActive = false;
    return;
  }

  var roundDraw = !gameState.includes('');

  if (roundDraw) {
    handleStatusDisplay(drawMessage());
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  handleStatusDisplay(currentPlayerTurn());
}

function restartGameState() {
  var i = gameState.length;

  while (i--) {
    gameState[i] = '';
  }
}

function count() {
  if (currentPlayer === 'O') {
    left++;
  } else if (currentPlayer === 'X') {
    right++;
  }

  countRight.innerHTML = "X : ".concat(right);
  countLeft.innerHTML = "O : ".concat(left);
}

function color() {
  for (i; 1 < 9; i++) {
    if (gameState[i] === 'X') {
      cell[i].style.color = 'red';
    }
  }
}

main();