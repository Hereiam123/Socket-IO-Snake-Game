const io = require("socket.io")();
const { createGameState, gameLoop, getUpdatedVelocity } = require("./game");
const { FRAME_RATE } = require("./constants");
const SERVER_PORT = 3000;

io.on("connection", (client) => {
  const state = createGameState();

  client.on("keydown", handleKeyDown);

  //Handle front end key down
  function handleKeyDown(keyCode) {
    try {
      keyCode = parseInt(keyCode);
    } catch (e) {
      console.log(e);
      return;
    }

    const vel = getUpdatedVelocity(keyCode);

    if (vel) {
      //Bitwise check to see if player is pressing opposite direction of current, to prevent
      //auto loss
      if (
        (vel.x ^ state.player.vel.x) > -2 &&
        (vel.y ^ state.player.vel.y) > -2
      ) {
        state.player.vel = vel;
      }
    }
  }

  startGameInterval(client, state);
});

//Start game on connection above
function startGameInterval(client, state) {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state);
    if (!winner) {
      client.emit("gameState", JSON.stringify(state));
    } else {
      client.emit("gameOver");
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

io.listen(SERVER_PORT);
