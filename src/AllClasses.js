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
      if (x >= this.height || y + ship.getLength() - 1 >= this.width) return;
    } else {
      if (x + ship.getLength() - 1 >= this.height || y >= this.width) return;
    }
    if (x < 0 || y < 0) return false;
    for (let i = -1; i <= ship.getLength(); i++) {
      if (!this.direction) {
        for (let j = -1; j <= 1; j++) {
          if (this.isShipExist(x + j, y + i)) return;
        }
      } else {
        for (let a = -1; a <= 1; a++) {
          if (this.isShipExist(x + i, y + a)) return;
        }
      }
    }
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
    return true;
  }
  receiveAttack(x, y) {
    let target = this.isShipExist(x, y);
    if (!this.duplicate(x, y)) {
      this.allAttacks.push([x, y]);
    } else return;
    if (!target) {
      this.allMisses.push([x, y]);
    } else {
      target.hit();
    }
  }
  duplicate(x, y) {
    for (let i = 0; i < this.allAttacks.length; i++) {
      if (x == this.allAttacks[i][0] && y == this.allAttacks[i][1]) {
        return true;
      }
    }
    return false;
  }
  isShipExist(x, y) {
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
  isGameEnded() {
    if (this.allShips.length == 0) return false;
    let sunkedShips = 0;
    for (let i = 0; i < this.allShips.length; i++) {
      if (this.allShips[i].ship.isSunk()) sunkedShips++;
    }
    if (sunkedShips == this.allShips.length) return true;
    else return false;
  }
}
class Player {
  constructor(player) {
    this.player = player;
    this.board = new GameBoard();
  }
  randomMove(target) {
    let count = 0;
    const randomX = Math.floor(Math.random() * this.board.height);
    const randomY = Math.floor(Math.random() * this.board.width);
    for (let i = 0; i < target.board.allAttacks.length; i++) {
      if (target.board.allAttacks[i][0] == randomX && target.board.allAttacks[i][1] == randomY) {
        count++;
      }
    }
    if (count > 0) {
      this.randomMove(target);
    } else {
      target.board.receiveAttack(randomX, randomY);
    }
  }
}
module.exports = { Ship, GameBoard, Player };
