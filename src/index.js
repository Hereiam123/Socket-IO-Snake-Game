const BG_COLOR = "#231f20";
const SNAKE_COLOR = "#c2c2c2";
const FOOD_COLOR = "#e66916";
const gameScreen = document.getElementById("gameScreen");
const initialScreen = document.getElementById("initialScreen");
const newGameBtn = document.getElementById("newGameButton");
const joinGameBtn = document.getElementById("joinGameBtn");
const gameCodeInput = document.getElementById("gameCodeInput");
const gameCodeDisplay = document.getElementById("gameCodeDisplay");

newGameBtn.addEventListener("click", newGame);
joinGameBtn.addEventListener("click", joinGame);

function newGame() {
  socket.emit("newGame");
  init();
}

function joinGame() {
  const code = gameCodeInput.value;
  socket.emit("joinGame", code);
  init();
}

const socket = io("http://localhost:3000");

//Socket IO handlers
socket.on("init", handleInit);
socket.on("gameState", handleGameState);
socket.on("gameOver", handleGameOver);
socket.on("gameCode", handleGameCode);

let canvas, ctx;

//Player ID
let playerNumber;

function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
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

//Handle paint game on room creation
function handleInit(number) {
  playerNumber = number;
}

//Handle gamestate
function handleGameState(gameState) {
  gameState = JSON.parse(gameState);
  requestAnimationFrame(function () {
    paintGame(gameState);
  });
}

//Handle Game over
function handleGameOver() {
  alert("You lose!");
}

//Handle Game Code
function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
}
