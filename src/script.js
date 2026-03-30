import './style.css';
const { Ship, Player } = require('./AllClasses');

// UI DOM elements
const playBtn = document.querySelector('.playBtn');
const p1container = document.querySelector('.p1Board');
const p2container = document.querySelector('.p2Board');
const turnDisplay = document.querySelector('.turn');
const endPopup = document.querySelector('.endPopup');
const heroDiv = document.querySelector('.hero');
const restartBtn = document.getElementById('restart');
const winner = document.getElementById('winner');
const choiceDiv = document.querySelector('.ships');
const randomForPlayer = document.querySelector('.rng');

// Game arrays
const p1Divs = []; // player board grid
const p2Divs = []; // computer board grid
const ships = []; // computer ships
const shipsCopy = []; // player ships

// Game objects
let player = new Player('p1');
let computer = new Player('computer');
let turn = player;
let draggedShip = null;

// Initializing all ships
ships.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2));
shipsCopy.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2));

// Play button for starting game
playBtn.addEventListener('click', () => {
  playBtn.style.display = 'none';
  choiceDiv.style.display = 'none';
  displayBoards(p2container, p2Divs, computer);
  displayTurn();
});

// event for random button for player that refreshes all data every interaction
randomForPlayer.addEventListener('click', () => {
  resetBoard();
  player.board.allShips.length = 0;
  randomSpawn(player, shipsCopy);
  displayBoards(p1container, p1Divs, player);
  if (player.board.allShips.length === 5) {
    playBtn.style.display = 'flex';
  }
});

// Spawning ships in random coords
const randomSpawn = (target, arr) => {
  for (let i = 0; i < arr.length; i++) {
    let x, y;
    const randomCoords = () => {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    };
    target.board.rotate();
    randomCoords();
    while (!target.board.setShip(x, y, arr[i])) {
      randomCoords();
    }
  }
};

// Helper
const resetBoard = () => {
  p1container.innerHTML = '';
  p1Divs.length = 0;
  shipsCopy.length = 0;
  shipsCopy.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2));
};

// Displaying ships to place on the board before the game
const displayShipsChoice = () => {
  for (let i = 0; i < shipsCopy.length; i++) {
    let currShip = document.createElement('div');
    currShip.classList.add('ship');
    currShip.id = 'drag-item';
    currShip.draggable = true;
    currShip.dataset.length = shipsCopy[i].length;
    for (let j = 0; j < shipsCopy[i].length; j++) {
      const shipPart = document.createElement('div');
      shipPart.classList.add('shipPart');
      currShip.appendChild(shipPart);
    }
    currShip.addEventListener('dragstart', (event) => {
      draggedShip = shipsCopy[i];
      event.dataTransfer.setData('text/plain', event.target.dataset.length);
    });
    choiceDiv.appendChild(currShip);
  }
};

// Display player board
const displayBoards = (container, arr, target) => {
  container.style.gridTemplateColumns = `repeat(10, 1fr)`;
  container.style.gridTemplateRows = `repeat(10, 1fr)`;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('block');
      cellDiv.dataset.x = i;
      cellDiv.dataset.y = j;
      container.appendChild(cellDiv);
      arr.push(cellDiv);
    }
  }
  if (target === player) addDropListeners(p1Divs);
  displayShips(target, arr);
  if (target === computer) attack(target, arr);
};

const addDropListeners = (arr) => {
  for (const div of arr) {
    div.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    div.addEventListener('drop', (event) => {
      event.preventDefault();
      for (let a = 0; a < player.board.allShips.length; a++) {
        if (player.board.allShips[a].ship === draggedShip) {
          player.board.allShips.splice(a, 1);
        }
      }
      player.board.setShip(parseInt(div.dataset.x), parseInt(div.dataset.y), draggedShip);
      for (let d = 0; d < 100; d++) {
        p1Divs[d].style.backgroundColor = '';
      }
      if (player.board.allShips.length === 5) {
        playBtn.style.display = 'flex';
      }
      displayShips(player, p1Divs);
    });
  }
};

// Display ships on the board
const displayShips = (target, arr) => {
  for (let i = 0; i < target.board.allShips.length; i++) {
    for (let x = target.board.allShips[i].startX; x <= target.board.allShips[i].endX; x++) {
      for (let y = target.board.allShips[i].startY; y <= target.board.allShips[i].endY; y++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].dataset.x == x && arr[j].dataset.y == y) {
            arr[j].style.backgroundColor = 'darkblue';
          }
        }
      }
    }
  }
};

// Display shots on the board
const displayShots = (target, arr) => {
  for (let i = 0; i < target.board.allAttacks.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].dataset.x == target.board.allAttacks[i][0] && arr[j].dataset.y == target.board.allAttacks[i][1]) {
        if (target.board.isShipExist(arr[j].dataset.x, arr[j].dataset.y)) {
          arr[j].style.backgroundColor = 'red';
        } else arr[j].innerHTML = 'X';
      }
    }
  }
};

// Attack function for player that recieve attack and also disable attacked block, so as not to shoot twice, changes turn, and refreshes DOM
const attack = (target, arr) => {
  arr.forEach((div) => {
    div.addEventListener('click', (e) => {
      div.classList.add('disabled');
      target.board.receiveAttack(e.target.dataset.x, e.target.dataset.y);
      changePlayersTurn();
      resetDisplayTurn();
      displayTurn();
      p2container.classList.toggle('disabled');
      setTimeout(computerAttack, 1);
      displayShots(target, arr);
      gameEnd();
    });
  });
};

// Helper function to reset values for displayTurn()
const resetDisplayTurn = () => {
  i = 0;
  turnDisplay.textContent = '';
};

// Attack function for computer that call player class function for attack, changes turn, and refreshes DOM
const computerAttack = () => {
  changePlayersTurn();
  resetDisplayTurn();
  displayTurn();
  computer.randomMove(player.board);
  p2container.classList.toggle('disabled');
  displayShots(player, p1Divs);
  gameEnd();
};

// Changing turn variable
const changePlayersTurn = () => {
  turn = turn === player ? computer : player;
};

// Geting whose turn and displaying it
let i = 0;
const getTurnText = () => `${turn.player} turn`;
const displayTurn = () => {
  let text = getTurnText();
  if (i < text.length) {
    turnDisplay.textContent += text[i];
    i++;
    setTimeout(displayTurn, 40);
  }
};

// Checking if game is end and displaying popup window
const gameEnd = () => {
  if (computer.board.isGameEnded()) {
    heroDiv.style.pointerEvents = 'none';
    winner.textContent = '';
    winner.textContent = 'PLAYER WIN';
    endPopup.style.display = 'flex';
  } else if (player.board.isGameEnded()) {
    heroDiv.style.pointerEvents = 'none';
    winner.textContent = '';
    winner.textContent = 'COMPUTER WIN';
    endPopup.style.display = 'flex';
  }
};

// Restart game button
restartBtn.addEventListener('click', () => {
  player = new Player('p1');
  computer = new Player('computer');
  resetBoard();
  p2Divs.length = 0;
  ships.length = 0;
  p2container.innerHTML = '';
  turn = player;
  heroDiv.style.pointerEvents = 'auto';
  endPopup.style.display = 'none';
  ships.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2));
  randomSpawn(computer, ships);
  displayBoards(p1container, p1Divs, player);
  choiceDiv.style.display = 'flex';
});

// Displaying player board, ships choice, spawning computer ships by default
displayBoards(p1container, p1Divs, player);
displayShipsChoice();
randomSpawn(computer, ships);
