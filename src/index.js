const BG_COLOR = "#231f20";
const SNAKE_COLOR = "#c2c2c2";
const FOOD_COLOR = "#e66916";
const gameScreen = document.getElementById("gameScreen");

let canvas, ctx;

//State of the game
const gameState = {
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
  gridsize: 20,
};

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 600;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.addEventListener("keydown", keydown);
}

function keydown(e) {
  console.log(e.keyCode);
}

function paintGame(state) {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const food = state.food;
  const gridsize = state.gridSize;

  //Helps to calculate positional state x,y space coordinate to grid space
  const size = canvas.width / gridsize;

  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(state.player, size, SNAKE_COLOR);
}

function paintPlayer(playerState, size, color) {
  const snake = playerState.snake;
  for (let cell of snake) {
    ctx.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

init();
paintGame(gameState);
