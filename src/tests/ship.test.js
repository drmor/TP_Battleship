const { Ship, GameBoard } = require('../script');

describe('Ship Class', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(5);
  });
  it('testing hits at start', () => {
    expect(ship.getHits()).toBe(0);
  });
  it('testing increasing hits', () => {
    ship.hit();
    expect(ship.getHits()).toBe(1);
  });
  it('testing to sunk the ship with one hit', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  it('testing to sunk the ship', () => {
    for (let i = 0; i < ship.length; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
describe('GameBoard Class', () => {
  let board;
  beforeEach(() => {
    board = new GameBoard();
  });
  it('testing an empty board', () => {
    expect(board.getShips()).toEqual([]);
  });
  it('testing to set a proper ship coords 1', () => {
    const ship = new Ship(5);
    board.setShip(0, 0, ship);
    expect(board.getShips()).toEqual([
      {
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 5,
        ship: ship,
      },
    ]);
  });
  it('testing to set a proper ship coords 2', () => {
    const ship = new Ship(4);
    board.setShip(2, 5, ship);
    expect(board.getShips()).toEqual([
      {
        startX: 2,
        endX: 2,
        startY: 5,
        endY: 9,
        ship: ship,
      },
    ]);
  });
  it('testing to set multiple ships with proper coords', () => {
    const shipOne = new Ship(4);
    const shipTwo = new Ship(2);
    const shipThree = new Ship(5);
    board.setShip(7, 3, shipOne);
    board.setShip(2, 5, shipTwo);
    board.setShip(0, 1, shipThree);
    expect(board.getShips()).toEqual([
      {
        startX: 7,
        endX: 7,
        startY: 3,
        endY: 7,
        ship: shipOne,
      },
      {
        startX: 2,
        endX: 2,
        startY: 5,
        endY: 7,
        ship: shipTwo,
      },
      {
        startX: 0,
        endX: 0,
        startY: 1,
        endY: 6,
        ship: shipThree,
      },
    ]);
  });
  it('testing to set wrong ship coords 1', () => {
    const ship = new Ship(5);
    board.setShip(11, 5, ship);
    expect(board.setShip(11, 5, ship)).toBe(false);
    expect(board.getShips()).toEqual([]);
  });
  it('testing to set wrong ship coords 2', () => {
    const ship = new Ship(4);
    board.setShip(8, 8, ship);
    expect(board.setShip(8, 8, ship)).toBe(false);
    expect(board.getShips()).toEqual([]);
  });
  it('testing to set multiple ships with wrong and right coords', () => {
    const shipOne = new Ship(4);
    const shipTwo = new Ship(2);
    const shipThree = new Ship(5);
    const shipFour = new Ship(2);
    board.setShip(7, 3, shipOne);
    board.setShip(12, 2, shipTwo);
    board.setShip(10, 8, shipThree);
    board.setShip(0, 7, shipFour);
    expect(board.getShips()).toEqual([
      {
        startX: 7,
        endX: 7,
        startY: 3,
        endY: 7,
        ship: shipOne,
      },
      {
        startX: 0,
        endX: 0,
        startY: 7,
        endY: 9,
        ship: shipFour,
      },
    ]);
  });
  it('testing change orientation', () => {
    const ship = new Ship(5);
    board.rotate();
    board.setShip(0, 0, ship);
    expect(board.getShips()).toEqual([
      {
        startX: 0,
        endX: 5,
        startY: 0,
        endY: 0,
        ship: ship,
      },
    ]);
  });
});
