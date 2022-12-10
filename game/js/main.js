"use strict";
var barPoint = 50;
var barPoint2 = 50;
window.addEventListener('load', app);
var mode = 0;
var Player01 = 'O';
var Player02 = 'X';
var gameBoard = ['', '', '', '', '', '', '', '', ''];
let winner = false;
let gameOver = false;
let turn = 0; // Keeps track if X or O player's turn


const cells = document.querySelector('.board__main');


const winningSequences = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
//SCOREBOARD
const scoreboard = {
  player1: 0,
  player2: 0,
  draw: 0,
  newscore: 0,
};
// CREATE PLAYER
const player = (name) => {
  name = name;
  return { name };
};

let playerX = player("");
let playerY = player("");


function check(input) {

  var checkboxes = document.getElementsByClassName("radioCheck");


  for (var i = 0; i < checkboxes.length; i++) {
    //uncheck all
    if (checkboxes[i].checked == true) {
      checkboxes[i].checked = false;
    }
  }
  //set checked of clicked object
  if (input.checked == true) {
    input.checked = false;
  }
  else {
    input.checked = true;
  }

  let checkname = document.querySelectorAll('input[name="checkboxes"]:checked');
  let output = [];
  checkname.forEach((checkinput) => {
    output.push(checkinput.value);
  });
  //Player Choice of X or O
  if (output == 'O') {
    Player02 = 'X';
  } else {
    Player02 = 'O';
  }
  Player01 = output;

}

function modePVP() {
  // PVP Choice Button
  const pvpFormContainer = document.querySelector('.landingpage');
  const boardPVP = document.querySelector('.enter-players');
  pvpFormContainer.classList.add('hide-container');
  boardPVP.classList.remove('hide-container');



}

function modePVC() {


  // PVC Choice Button
  const pvpFormContainer = document.querySelector('.landingpage');
  const boardPVC = document.querySelector('.enter-pvc');
  pvpFormContainer.classList.add('hide-container');
  boardPVC.classList.remove('hide-container');



  let box = document.querySelector('.score').firstElementChild;

  console.log(box);
}


// INITIALIZE APP
function app() {
  //focus();
  // Calling PVP Button
  const addPlayerForm = document.getElementById('player-form');
  addPlayerForm.addEventListener('submit', addPlayers);

  // calling PVC Button
  const addPvCForm = document.getElementById('pvp-form');
  addPvCForm.addEventListener('submit', addPvC);


  let replayButton = document.querySelector('.replay-btn');
  replayButton.addEventListener('click', resetBoard);


  let backButton = document.querySelector('.back-btn');
  backButton.addEventListener('click', backMode);

}

function backMode() {

  location.reload();
}

// Add PLAYERS
function addPlayers(event) {
  event.preventDefault();

  if (this.player1.value === '' || this.player2.value === '') {
    alert('You Must Enter a Name for Each Field');
    return;
  }
  const playerFormContainer = document.querySelector('.enter-players');
  const boardMain = document.querySelector('.board__main');
  playerFormContainer.classList.add('hide-container');
  boardMain.classList.remove('hide-container');
  // Player Name
  playerX.name = this.player1.value;
  playerY.name = this.player2.value;
  mode = 1
  buildBoard();

}


function addPvC(square) {
  square.preventDefault();

  if (this.player1.value === '') {
    alert('You Must Enter a Name for Each Field');
    return;
  }

  const pvcContainer = document.querySelector('.enter-pvc');
  const boardPVC = document.querySelector('.board__main');
  pvcContainer.classList.add('hide-container');
  boardPVC.classList.remove('hide-container');

  playerX.name = this.player1.value;
  playerY.name = "Computer";
  mode = 2

  buildBoard();
}

// RETURN CURRENT PLAYER
function currentPlayer() {

  return turn % 2 === 0 ? Player02 : Player01;
}

// Resize squares in event browser is resized
window.addEventListener("resize", onResize);
function onResize() {
  let allCells = document.querySelectorAll('.board__cell');
  let cellHeight = allCells[0].offsetWidth;

  allCells.forEach(cell => {
    cell.style.height = `${cellHeight}px`;
  });

}

// Build Board 
function buildBoard() {

  if (mode === 1) {
    //Build board for PVP
    let resetContainer =
      document.querySelector('.reset');
    resetContainer.classList.remove('reset--hidden');

    addCellClickListener();


  } else {
    //Build Board For PVC
    alert('mode PVC start')
    let resetContainer = document.querySelector('.reset');
    resetContainer.classList.remove('reset--hidden');


    pvcCellClickListener();

  }
  onResize();
  scoredBoard()
  changeBoardHeaderNames();

}

// CELL CLICK EVENT FOR PLAYER TO ATTEMPT TO MAKE MOVE
function makeMove(event) {

  let currentCell = parseInt(event.currentTarget.firstElementChild.id);
  let cellToAddToken = document.querySelector(`[id='${currentCell}']`);


  if (cellToAddToken.innerHTML !== '') {
    alert('This cell is already taken.');
    return;
  } else {
    // Update turn count so next player can choose
    turn++;

    if (currentPlayer() === Player01) {
      cellToAddToken.textContent = currentPlayer();
      gameBoard[currentCell] = Player01;
    } else {
      cellToAddToken.textContent = currentPlayer();
      gameBoard[currentCell] = Player02;
    }
  }
  // CHECK IF WE HAVE A WINNER
  isWinner();
  // CHANGE BOARD HEADER INFO
  changeBoardHeaderNames();
  drawCheck();
}

function isWinner() {

  // Check For Winner With Combo
  winningSequences.forEach(winningCombos => {
    let cell1 = winningCombos[0];
    let cell2 = winningCombos[1];
    let cell3 = winningCombos[2];
    if (
      gameBoard[cell1] === currentPlayer() &&
      gameBoard[cell2] === currentPlayer() &&
      gameBoard[cell3] === currentPlayer()
    ) {
      const cells = document.querySelectorAll('.board__cell');
      cells.forEach(cell => {
        let cellId = cell.firstElementChild.id;

        if (cellId == cell1 || cellId == cell2 || cellId == cell3) {
          cell.classList.add('board__cell--winner');
        }
      });

      let currentPlayerText = document.querySelector('.board___player-turn');

      if (currentPlayer() === Player01) {
        currentPlayerText.innerHTML = `
          <div class="congratulations">Congratulations ${playerX.name}</div>
          <div class="u-r-winner">You are our winner!</div>
        `;

        barPoint = barPoint - 50 / 6;
        console.log(barPoint + '%');
        document.getElementById("score2").style.width = `${barPoint}%`;
        winner = true;
        scoreboard.player1++;
        removeCellClickListener();
        return true;
      }

      if (currentPlayer() === Player02) {
        if (mode === 1) {
          currentPlayerText.innerHTML = `
          <div class="congratulations">Congratulations ${playerY.name}</div>
          <div class="u-r-winner">You are our winner!</div>
         `;
        } else {
          currentPlayerText.innerHTML = `
          <div class="congratulations">It's the Computer Win</div>
          <div class="u-r-winner">You Can't Win This Game!</div>
         `;
        }
        barPoint2 = barPoint2 - 50 / 6;
        console.log(barPoint2 + '%');
        document.getElementById("score1").style.width = `${barPoint2}%`;
        scoreboard.player2++;
        winner = true;
        removeCellClickListener();
        return true;
      }

    }

  });

  scoredBoard();

  return false;
}

function drawCheck() {
  if (!winner) {
    // Check if Draw Game for PVP
    let currentPlayerText = document.querySelector('.board___player-turn');
    console.log(turn)
    if (turn === 9) {
      currentPlayerText.innerHTML = `
    <div class="congratulations">Game Is Tie</div>
    <div class="u-r-winner">Resetting Board....!</div>
  `;
      scoreboard.draw++;
      scoredBoard()
      setTimeout(() => resetBoard(), 1000)
    }
  }

}


function scoredBoard() {
  let currentPlayerText = document.querySelector('.board___player-turn');
  // Insert Player Name and Scores to Score Board
  if (scoreboard.player1 > 5 || scoreboard.player2 > 5) {
    currentPlayerText.innerHTML = `
      <span class="name--style">${playerX.name}</span>, won 6 games!
      <div class="u-r-winner">Game Over! Reseting Score</div>
    `
    scoreboard.player1 = 0;
    scoreboard.player2 = 0;
    scoreboard.draw = 0;
    scoreboard.newscore = 0;
    barPoint = 50;
    barPoint2 = 50;

    document.getElementById("score1").style.width = '50%'
    document.getElementById("score2").style.width = '50%'


  }

  score1.innerHTML = `
    <p>${playerX.name}: ${scoreboard.player1}</p>
    `;

  score2.innerHTML = `
    <p>${playerY.name}: ${scoreboard.player2}</p>
    `;

  draw.innerHTML = `
    <p>Draw: ${scoreboard.draw}</p>
    `;
    
  newscore.innerHTML = `
    <p>Game: ${scoreboard.player1 + scoreboard.player2 + scoreboard.draw}</p>
    `;
}


function changeBoardHeaderNames() {
  //Change Header Turn Function
  if (!winner) {
    let currentPlayerText = document.querySelector('.board___player-turn');
    if (currentPlayer() === Player02) {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerX.name}</span>, you are up!
        <div class="u-r-winner"></div>
      `
    } else {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerY.name}</span>, you are up.
        <div class="u-r-winner"></div>
      `
    }
  }
}




function resetBoard() {

  // Reset Board

  gameBoard = ['', '', '', '', '', '', '', '', ''];
  turn = 0;
  winner = false;

  let currentPlayerText = document.querySelector('.board___player-turn');
  currentPlayerText.innerHTML = `
    <span class="name--style">${playerX.name}</span>, you are up!
    <div class="u-r-winner"></div>
  `
  let cellToAddToken = document.querySelectorAll('.letter');
  cellToAddToken.forEach(square => {
    square.textContent = '';
    square.parentElement.classList.remove('board__cell--winner');
  });



  if (mode === 1) {
    //Reset Board for PVP
    addCellClickListener();

  } else {
    (mode === 2)
    //Reset Board for PVC
    pvcCellClickListener();

  }
}


function addCellClickListener() {
  // PVP Click Listener
  const cells = document.querySelectorAll('.board__cell');
  cells.forEach(cell => {
    cell.addEventListener('click', makeMove);
  });
}
function removeCellClickListener() {

  // Remove Player Click Action for Pvp
  let allCells = document.querySelectorAll('.board__cell');
  if (mode == 1) {

    allCells.forEach(cell => {
      cell.removeEventListener('click', makeMove);
    });
  }
  else {
    // Remove  Click Action for PVC
    allCells.forEach(cell => {
      cell.removeEventListener('click', turnClick);
    });
  }

}

// Computer Plays

function pvcCellClickListener() {

  //Player Vs computer CLick Listener

  const cells = document.querySelectorAll('.board__cell');
  gameBoard = Array.from(Array(9).keys());

  cells.forEach(cell => {
    cell.addEventListener('click', turnClick);
  });


}

function turnClick(square) {
  //Tracking Player Clicks
  let currentCell = parseInt(square.currentTarget.firstElementChild.id);
  let currentPlayerText = document.querySelector('.board___player-turn');

  if (typeof gameBoard[currentCell] == 'number') {
    turns(currentCell, Player01)

    currentPlayerText.innerHTML = `<div class="congratulations">Hold on....!!!</div>
     <div class="u-r-winner"> It's Computer Turn</div>`

    if (!pvcTie() && !isWinner()) setTimeout(() => turns(bestSpot(), Player02), 200);
  }
}


function turns(squareId, player) {

  let currentPlayerText = document.querySelector('.board___player-turn');

  currentPlayerText.innerHTML = `
  <span class="name--style">${playerX.name}</span>, your turn!
  <div class="u-r-winner"></div>`
  // Computer Action Start
  gameBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  isWinner();

}


function pvcTie() {
  let currentPlayerText = document.querySelector('.board___player-turn');
  if (emptySquares().length == 0) {

    setTimeout(() => resetBoard(), 1000)
    scoreboard.draw++;
    scoredBoard();
    currentPlayerText.innerHTML = `<div class="congratulations">Game Is Tie</div>
      <div class="u-r-winner">Resetting Board....!</div>
    `;
    return true;
  }
  return false;
}


function calculateWin(board, player) {

  // Computer Calculation of Win & loss Scenerio
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winningSequences.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  //  console.log(gameWon)
  return gameWon;
}

function emptySquares() {
  // Check For Empty Spaces
  return gameBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
  // Returning Result of miniMax Algorithm
  return minimax(gameBoard, Player02).index;
}

function minimax(newBoard, player) {

  /// MiniMax algorithm AI Calculates Best Move By Go Through All Win Loses Scenerio
  var availSpots = emptySquares();
  //console.log(newBoard)

  if (calculateWin(newBoard, Player01)) {
    return { score: -10 };
  } else if (calculateWin(newBoard, Player02)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == Player02) {
      var result = minimax(newBoard, Player01);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, Player02);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === Player02) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}


