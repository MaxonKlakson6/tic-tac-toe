import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GameRoomLayout from "../components/GameRoomLayout";

import { AppContext } from "../../../index";

import { GameSymbols, Room } from "../../Home/types";
import { GameOverMessage, User } from "../types";

const GameRoomContainer: FC = () => {
  const wsServer = useContext(AppContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<GameOverMessage>("");

  wsServer
    ?.off("room-user-info")
    .on("room-user-info", (room: Room, user: User) => {
      setRoom(room);
      setUser(user);
    });

  wsServer?.off("update-room").on("update-room", (updatedRoom: Room) => {
    setRoom(updatedRoom);
  });

  wsServer?.off("win").on("game-finished", (message: GameOverMessage) => {
    setGameOverMessage(message);
  });

  const handleChangeTurn = (index: number, item: GameSymbols): void => {
    if (!item && room?.turn === user?.symbol) {
      wsServer?.emit("change-turn", room?.id);
      wsServer?.emit("change-field", room?.id, index, user?.symbol);
    }
  };

  const handleLeaveRoom = (): void => {
    navigate("/");
  };

  useEffect(() => {
    const roomId = localStorage.getItem("roomId");
    const userId = localStorage.getItem("userId");

    wsServer?.emit("get-user", userId, roomId);

    return () => {
      wsServer?.emit("leave-room", roomId, userId);
      wsServer?.emit("reset-room", roomId);
    };
  }, []);

  return (
    <GameRoomLayout
      room={room}
      player={user}
      handleChangeTurn={handleChangeTurn}
      handleLeaveRoom={handleLeaveRoom}
      message={gameOverMessage}
    />
  );
};

export default GameRoomContainer;
