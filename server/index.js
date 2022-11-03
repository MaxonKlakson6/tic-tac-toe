const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();

app.use(cors());

const server = http.createServer(app);
const webSocketServer = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const rooms = [];

webSocketServer.on("connect", (socket) => {
  socket.on("create-room", (roomName, callback) => {
    const newRoom = {
      roomName,
      id: uuid(),
      users: {
        count: 0,
      },
    };

    rooms.push(newRoom);
    callback();

    webSocketServer.emit("send-rooms", rooms);
  });
  socket.on("get-rooms", () => {
    socket.emit("send-rooms", rooms);
  });
  socket.on("join-room", (data) => {
    const { userName, idToJoin } = data;

    const roomToJoin = rooms.find((room) => room.id === idToJoin);

    if (roomToJoin.users.count < 2) {
      roomToJoin.users[userName] = {
        id: socket.id,
      };
      roomToJoin.users.count += 1;

      socket.emit("join-permission", roomToJoin.id, roomToJoin.roomName);
      webSocketServer.emit("send-rooms", rooms);
    }
  });
  socket.on("leave-room", () => {
    console.log("leave");
  });
});

server.listen(5000, () => {
  console.log("server ran on port 5000");
});
