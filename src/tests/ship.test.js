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
describe('GameBoard Class', () => {});
