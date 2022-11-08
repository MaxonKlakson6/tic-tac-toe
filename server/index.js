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
      users: [],
      fields: ["", "", "", "", "", "", "", "", ""],
      turn: "X",
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

    const usersCount = roomToJoin.users.length;

    if (usersCount < 2) {
      const gameSymbol = usersCount === 0 ? "X" : "O";

      const newUser = {
        id: socket.id,
        name: userName,
        symbol: gameSymbol,
      };

      roomToJoin.users.push(newUser);

      socket.join(roomToJoin.roomName);
      socket.emit("join-permission", roomToJoin.roomName);
      socket.emit("joined", newUser, roomToJoin);
      webSocketServer.emit("send-rooms", rooms);
    }
  });

  socket.on("get-user", (userId, roomId) => {
    const room = rooms.find((room) => room.id === roomId);

    if (room) {
      const user = room.users.find((user) => user.id === userId);

      socket.emit("room-user-info", room, user);
    }
  });

  socket.on("change-turn", (roomId, userId) => {
    const room = rooms.find((room) => room.id === roomId);

    room.turn = room.turn === "X" ? "O" : "X";

    webSocketServer.in(room.roomName).emit("update-room", room);
  });

  socket.on("change-field", (roomId, index, symbol) => {
    const room = rooms.find((room) => room.id === roomId);

    room.fields[index] = symbol;

    webSocketServer.in(room.roomName).emit("update-room", room);
  });
});

server.listen(5000, () => {
  console.log("server ran on port 5000");
});
