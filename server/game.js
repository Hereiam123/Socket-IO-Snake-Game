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

function gameLoop(state) {
  if (!state) {
    return;
  }
  const playerOne = state.player;
  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;
  //Check if exited game stage
  if (
    playerOne.pos.x < 0 ||
    playerOne.pos.x > GRID_SIZE ||
    playerOne.pos.y < 0 ||
    playerOne.pos.y > GRID_SIZE
  ) {
    return 2;
  }
  //Check if player has 'eaten' on a food block
  //Add current player position to original player position
  if (state.food.x === playerOne.pos.x && state.foox.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    //Create new food to eat
    randomFood();
  }

  /*Check if player has collided when themselves*/
  //Check if player is moving first
  if (playerOne.vel.x || playerOne.vel.y) {
    for (let segment of playerOne.snake) {
      if (segment.x === playerOne.pos.x && segment.y === playerOne.pos.y) {
      }
    }
  }
}

module.exports = {
  createGameState,
  gameLoop,
};