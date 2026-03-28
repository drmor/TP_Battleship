import './style.css';
const { Ship, GameBoard, Player } = require('./AllClasses');
const playBtn = document.querySelector('.playBtn');

playBtn.addEventListener('click', () => {
  const player = new Player('p1');
  const computer = new Player('computer');
  const ship = new Ship(3);
  computer.board.setShip(0, 0, ship);
  player.board.setShip(5, 5, ship);
  console.log(player.board.getShips());
  console.log(computer.board.getShips());
  //playBtn.style.display = 'none';
});
function displayBoards() {}
