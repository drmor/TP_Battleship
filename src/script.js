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
    this.direction = false; // false = horizontal, true = vertical
  }
  getShips() {
    return this.allShips;
  }
  rotate() {
    this.direction = !this.direction;
  }
  setShip(x, y, ship) {
    if (!this.direction) {
      if (x >= this.height || y + ship.getLength() - 1 >= this.width)
        return false;
    } else {
      if (x + ship.getLength() - 1 >= this.height || y >= this.width)
        return false;
    }
    if (x < 0 || y < 0) return false;
    if (!this.direction)
      this.allShips.push({
        startX: x,
        endX: x,
        startY: y,
        endY: y + ship.getLength() - 1,
        ship: ship,
      });
    else
      this.allShips.push({
        startX: x,
        endX: x + ship.getLength() - 1,
        startY: y,
        endY: y,
        ship: ship,
      });
  }
}

module.exports = { Ship, GameBoard };
