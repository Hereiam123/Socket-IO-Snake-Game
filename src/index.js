const BG_COLOR = "#231f20";
const SNAKE_COLOR = "#c2c2c2";
const FOOD_COLOR = "#e66916";
const gameScreen = document.getElementById("gameScreen");

const socket = io("http://localhost:3000");

//Socket IO handles
socket.on("init", handleInit);
socket.on("gameState", handleGameState);

let canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 600;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.addEventListener("keydown", keydown);
}

//Send pressed key to server
function keydown(e) {
  socket.emit("keydown", e.keyCode);
}

init();

//Paint game screen
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

//Paint player
function paintPlayer(playerState, size, color) {
  const snake = playerState.snake;
  ctx.fillStyle = color;
  for (let segment of snake) {
    ctx.fillRect(segment.x * size, segment.y * size, size, size);
  }
}

//Handle paint game on init
function handleInit(msg) {
  console.log(msg);
  paintGame(gameState);
}

//Handle gamestate
function handleGameState(gameState) {
  gameState = JSON.parse(gameState);
  requestAnimationFrame(function () {
    paintGame(gameState);
  });
}
