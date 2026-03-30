import './style.css';
const { Ship, GameBoard, Player } = require('./AllClasses');
const playBtn = document.querySelector('.playBtn');
const p1container = document.querySelector('.p1Board');
const p2container = document.querySelector('.p2Board');
const turnDisplay = document.querySelector('.turn');
const endPopup = document.querySelector('.endPopup');
const heroDiv = document.querySelector('.hero');
const restartBtn = document.getElementById('restart');
const winner = document.getElementById('winner');
const choiceDiv = document.querySelector('.ships');
const p1Divs = [];
const p2Divs = [];
const ships = [];
const shipsCopy = [];
let player = new Player('p1');
let computer = new Player('computer');
let turn = player;

// all standart ships
ships.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2));
shipsCopy.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2));
const randomSpawn = () => {
  for (let i = 0; i < ships.length; i++) {
    let x, y;
    const randomCoords = () => {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    };
    computer.board.rotate();
    randomCoords();
    while (!computer.board.setShip(x, y, ships[i])) {
      randomCoords();
    }
  }
};
randomSpawn();
playBtn.addEventListener('click', () => {
  console.log(player.board.getShips());
  console.log(computer.board.getShips());
  playBtn.style.display = 'none';
  choiceDiv.style.display = 'none';
  displayBoards(p2container, p2Divs, computer);
});
let draggedShip = null;

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
displayShipsChoice();

const displayBoards = (container, arr, target) => {
  container.style.gridTemplateColumns = `repeat(10, 1fr)`;
  container.style.gridTemplateRows = `repeat(10, 1fr)`;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('block');
      cellDiv.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
      cellDiv.addEventListener('drop', (event) => {
        event.preventDefault();
        for (let a = 0; a < player.board.allShips.length; a++) {
          if (player.board.allShips[a].ship === draggedShip) {
            player.board.allShips.splice(a, 1);
          }
        }
        player.board.setShip(parseInt(cellDiv.dataset.x), parseInt(cellDiv.dataset.y), draggedShip);
        for (let d = 0; d < 100; d++) {
          p1Divs[d].style.backgroundColor = '';
        }
        if (player.board.allShips.length === 5) {
          playBtn.style.display = 'flex';
        }
        displayShips(player, p1Divs);
      });
      cellDiv.dataset.x = i;
      cellDiv.dataset.y = j;
      container.appendChild(cellDiv);
      arr.push(cellDiv);
    }
  }
  displayShips(target, arr);
  attack(target, arr);
};
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
const attack = (target, arr) => {
  arr.forEach((div) => {
    div.addEventListener('click', (e) => {
      div.classList.add('disabled');
      target.board.receiveAttack(e.target.dataset.x, e.target.dataset.y);
      changePlayersTurn();
      resetDisplayTurn();
      displayTurn();
      p2container.classList.toggle('disabled');
      setTimeout(computerAttack, 1); //700
      displayShots(target, arr);
      gameEnd();
    });
  });
};

const resetDisplayTurn = () => {
  i = 0; // reset displayTurn
  turnDisplay.textContent = ''; // reset displayTurn
};
const computerAttack = () => {
  changePlayersTurn();
  resetDisplayTurn();
  displayTurn();
  computer.randomMove(player.board);
  p2container.classList.toggle('disabled');
  displayShots(player, p1Divs);
  gameEnd();
};
const changePlayersTurn = () => {
  turn = turn === player ? computer : player;
};

let i = 0;
const getTurnText = () => `${turn.player} turn`;
const displayTurn = () => {
  let text = getTurnText();
  if (i < text.length) {
    turnDisplay.textContent += text[i];
    i++;
    setTimeout(displayTurn, 30);
  }
};
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
restartBtn.addEventListener('click', () => {
  player = new Player('p1');
  computer = new Player('computer');
  p1Divs.length = 0;
  p2Divs.length = 0;
  ships.length = 0;
  p1container.innerHTML = '';
  p2container.innerHTML = '';
  turn = player;
  heroDiv.style.pointerEvents = 'auto';
  endPopup.style.display = 'none';
  ships.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2));
  randomSpawn();
  displayBoards(p1container, p1Divs, player);
  choiceDiv.style.display = 'flex';
});
displayTurn();
displayBoards(p1container, p1Divs, player);
