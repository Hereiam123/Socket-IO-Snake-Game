const io = require("socket.io")();
const { initGame, gameLoop, getUpdatedVelocity } = require("./game");
const { makeId } = require("./utils");
const { FRAME_RATE } = require("./constants");
const SERVER_PORT = 3000;

const state = {};
const clientRooms = {};

io.on("connection", (client) => {
  client.on("keydown", handleKeyDown);
  client.on("newGame", handleNewGame);
  client.on("joinGame", handleJoinGame);

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

  //Handle new game
  function handleNewGame() {
    let roomName = makeId(5);
    clientRooms[client.id] = roomName;
    client.emit("gameCode", roomName);
    state[roomName] = initGame();
    client.join(roomName);
    client.number = 1;
    client.emit("init", 1);
  }

  //Handle join game
  function handleJoinGame(gameCode) {
    const room = io.sockets.adapter.rooms[gameCode];
    let allUsers;

    //Check if roome exists
    if (room) {
      allUsers = room.sockets;
    }

    //Check number of players in room
    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }

    //Unknown room
    if (numClients === 0) {
      client.emit("unknownGame");
      return;
    }
    //Room already full
    else if (numClients > 1) {
      client.emit("roomFull");
      return;
    }
    clientRooms[client.id] = gameCode;
    client.join(gameCode);
    client.number = 2;
    client.emit("init", 2);
    startGameInterval(gameCode);
  }
});

//Start game on connection above
function startGameInterval(gameCode) {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state[gameCode]);
    if (!winner) {
      client.emit("gameState", JSON.stringify(state));
    } else {
      client.emit("gameOver");
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

io.listen(SERVER_PORT);
