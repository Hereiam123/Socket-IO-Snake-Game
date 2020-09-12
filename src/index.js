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

init();
