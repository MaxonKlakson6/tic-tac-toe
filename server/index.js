const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
const webSocketServer = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

webSocketServer.on("connect", (socket) => {});

server.listen(5000, () => {
  console.log("server ran on port 5000");
});
