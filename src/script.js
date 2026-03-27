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
    this.allAttacks = [];
    this.allMisses = [];
    this.direction = false; // false = horizontal, true = vertical
  }
  getShips() {
    return this.allShips;
  }
  getAttacksArr() {
    return this.allAttacks;
  }
  getMissesArr() {
    return this.allMisses;
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
  receiveAttack(x, y) {
    let target = this.exist(x, y);
    this.allAttacks.push([x, y]);
    if (!target) {
      this.allMisses.push([x, y]);
    } else {
      target.hit();
    }
  }
  exist(x, y) {
    for (let i = 0; i < this.allShips.length; i++) {
      let xIsFound = false;
      let yIsFound = false;
      for (let j = this.allShips[i].startX; j <= this.allShips[i].endX; j++) {
        if (x == j) xIsFound = true;
      }
      for (let t = this.allShips[i].startY; t <= this.allShips[i].endY; t++) {
        if (y == t) yIsFound = true;
      }
      if (xIsFound && yIsFound) return this.allShips[i].ship;
    }
    return false;
  }
}

module.exports = { Ship, GameBoard };
