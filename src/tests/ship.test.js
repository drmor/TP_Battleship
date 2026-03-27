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
    expect(board.getShips()).toEqual([[0, 5]]);
  });
  it('testing to set a proper ship coords 2', () => {
    const ship = new Ship(4);
    board.setShip(2, 5, ship);
    expect(board.getShips()).toEqual([[2, 9]]);
  });
  it('testing to set multiple ships with proper coords', () => {
    const shipOne = new Ship(4);
    const shipTwo = new Ship(2);
    const shipThree = new Ship(5);
    board.setShip(7, 3, shipOne);
    board.setShip(2, 5, shipTwo);
    board.setShip(0, 1, shipThree);
    expect(board.getShips()).toEqual([
      [7, 7],
      [2, 7],
      [0, 6],
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
  it('testing to set multiple ships with wrong coords', () => {
    const shipOne = new Ship(4);
    const shipTwo = new Ship(2);
    const shipThree = new Ship(5);
    const shipFour = new Ship(2);
    board.setShip(7, 3, shipOne);
    board.setShip(12, 2, shipTwo);
    board.setShip(10, 8, shipThree);
    board.setShip(0, 8, shipFour);
    expect(board.getShips()).toEqual([
      [7, 7],
      [0, 10],
    ]);
  });
});
