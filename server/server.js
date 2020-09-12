const io = require("socket.io")();

const SERVER_PORT = 3000;

io.on("connection", (client) => {
  client.emit("init", { data: "Hello World" });
});

io.listen(SERVER_PORT);
