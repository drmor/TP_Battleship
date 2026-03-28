import './style.css';
const { Ship, GameBoard, Player } = require('./AllClasses');
const playBtn = document.querySelector('.playBtn');
const p1container = document.querySelector('.p1Board');
const p2container = document.querySelector('.p2Board');
const p1Divs = [];
const p2Divs = [];
const player = new Player('p1');
const computer = new Player('computer');
const ship = new Ship(3);
computer.board.setShip(0, 0, ship);
player.board.setShip(5, 5, ship);
playBtn.addEventListener('click', () => {
  console.log(player.board.getShips());
  console.log(computer.board.getShips());
  //   playBtn.style.display = 'none';
  //   displayBoards();
});
function displayBoards(container, arr) {
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
}
function attack(arr) {
  arr.forEach((div) => {
    div.addEventListener('click', () => {});
  });
}
displayBoards(p1container, p1Divs);
displayBoards(p2container, p2Divs);
