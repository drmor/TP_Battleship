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
}

class GameBoard {
  constructor() {
    this.height = 10;
    this.width = 10;
  }
}

module.exports = { Ship, GameBoard };
