import './style.css';
const { Ship, GameBoard, Player } = require('./AllClasses');
const playBtn = document.querySelector('.playBtn');
const p1container = document.querySelector('.p1Board');
const p2container = document.querySelector('.p2Board');
const turnDisplay = document.querySelector('.turn');
const p1Divs = [];
const p2Divs = [];
const ships = [];
const player = new Player('p1');
const computer = new Player('computer');
let turn = player;

// all standart ships
const carrier = new Ship(5);
const battleship = new Ship(4);
const cruiser = new Ship(3);
const submarine = new Ship(3);
const destroyer = new Ship(2);
ships.push(carrier, battleship, cruiser, submarine, destroyer);
const randomSpawn = () => {
  for (let i = 0; i < ships.length; i++) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    computer.board.setShip(x, y, ships[i]);
    console.log(computer.board.allShips);
  }
};
randomSpawn();
player.board.setShip(5, 5, destroyer);
playBtn.addEventListener('click', () => {
  console.log(player.board.getShips());
  console.log(computer.board.getShips());
  //   playBtn.style.display = 'none';
  //   displayBoards();
});
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
      target.board.receiveAttack(e.target.dataset.x, e.target.dataset.y);
      changePlayersTurn();
      resetDisplayTurn();
      displayTurn();
      p2container.classList.toggle('disabled');
      setTimeout(computerAttack, 1700);
      displayShots(target, arr);
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
  computer.randomMove(player);
  p2container.classList.toggle('disabled');
  displayShots(player, p1Divs);
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
displayTurn();
displayBoards(p1container, p1Divs, player);
displayBoards(p2container, p2Divs, computer);
