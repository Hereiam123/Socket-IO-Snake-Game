//Setting up initial game state
const { GRID_SIZE } = require("./constants");

function createGameState() {
  //State of the game
  return {
    player: {
      //Position of player
      pos: {
        x: 3,
        y: 10,
      },
      //Velocity of player snake
      vel: {
        x: 1,
        y: 0,
      },
      //Position of player snake segments
      snake: [
        { x: 1, y: 10 },
        { x: 2, y: 10 },
        { x: 3, y: 10 },
      ],
    },
    //Position of food on game screen
    food: {
      x: 7,
      y: 7,
    },
    //Size of game screen
    gridSize: GRID_SIZE,
  };
}

module.exports = {
  createGameState,
};
