//Setting up initial game state
const { GRID_SIZE } = require("./constants");

function initGame() {
  const state = createGameState();
  randomFood(state);
  return state;
}

function createGameState() {
  //State of the game
  return {
    players: [
      {
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
      {
        //Position of player
        pos: {
          x: 15,
          y: 10,
        },
        //Velocity of player snake
        vel: {
          x: 0,
          y: 0,
        },
        //Position of player snake segments
        snake: [
          { x: 20, y: 10 },
          { x: 19, y: 10 },
          { x: 18, y: 10 },
        ],
      },
    ],
    //Position of food on game screen
    food: {},
    //Size of game screen
    gridSize: GRID_SIZE,
  };
}

function gameLoop(state) {
  if (!state) {
    return;
  }
  const playerOne = state.players[0];
  const playerTwo = state.players[1];
  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;
  //Check if exited game stage, and return number of player who won
  if (
    playerOne.pos.x < 0 ||
    playerOne.pos.x > GRID_SIZE ||
    playerOne.pos.y < 0 ||
    playerOne.pos.y > GRID_SIZE
  ) {
    return 2;
  }
  if (
    playerTwo.pos.x < 0 ||
    playerTwo.pos.x > GRID_SIZE ||
    playerTwo.pos.y < 0 ||
    playerTwo.pos.y > GRID_SIZE
  ) {
    return 1;
  }

  //Check if player has 'eaten' on a food block
  //Add current player position to original player position
  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    //Create new food to eat
    randomFood(state);
  }

  if (state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y) {
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;
    //Create new food to eat
    randomFood(state);
  }

  //Check if player is moving first
  if (playerOne.vel.x || playerOne.vel.y) {
    /*Check if player has collided when themselves*/
    for (let segment of playerOne.snake) {
      if (segment.x === playerOne.pos.x && segment.y === playerOne.pos.y) {
        return 2;
      }
    }
    //Move player front and shift the back up, to simulate movement
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  //Check if player is moving first
  if (playerTwo.vel.x || playerTwo.vel.y) {
    /*Check if player has collided when themselves*/
    for (let segment of playerTwo.snake) {
      if (segment.x === playerTwo.pos.x && segment.y === playerTwo.pos.y) {
        return 1;
      }
    }
    //Move player front and shift the back up, to simulate movement
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.snake.shift();
  }
  return false;
}

//Create random food
function randomFood(state) {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
  //Make sure we aren't adding food on top of snake
  for (let segment of state.players[0].snake) {
    if (segment.x === food.x && segment.y === food.y) {
      return randomFood(state);
    }
  }

  //Make sure we aren't adding food on top of snake
  for (let segment of state.players[1].snake) {
    if (segment.x === food.x && segment.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

//Return velocity updated if arrow key is pressed
function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    case 37: //Left
      return { x: -1, y: 0 };
    case 38: //Down
      return { x: 0, y: -1 };
    case 39: //Right
      return { x: 1, y: 0 };
    case 40: //Up
      return { x: 0, y: 1 };
  }
}

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
};
