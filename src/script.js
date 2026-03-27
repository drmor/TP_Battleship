//import "./style.css";
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.hits === this.length) return true;
    else return false;
  }
  getHits() {
    return this.hits;
  }
  getLength() {
    return this.length;
  }
}

class GameBoard {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.allShips = [];
  }
  getShips() {
    return this.allShips;
  }
  setShip(x, y, ship) {
    if (x > this.height || y + ship.getLength() > this.width) return false;
    if (x < 0 || y < 0) return false;
    this.allShips.push([x, y + ship.getLength()]);
  }
}

module.exports = { Ship, GameBoard };
