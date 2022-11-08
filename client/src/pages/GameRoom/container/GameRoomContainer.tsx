import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../index";
import GameRoomLayout from "../components/GameRoomLayout";
import { GameSymbols, Room } from "../../Home/types";
import { User } from "../types";

const GameRoomContainer = () => {
  const wsServer = useContext(AppContext);

  const [room, setRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [count, setCount] = useState(1);

  wsServer?.off("joined").on("joined", (user, room) => {
    setUser(user);
    setRoom(room);

    localStorage.setItem("userId", user.id);
    localStorage.setItem("roomId", room.id);
  });

  wsServer?.off("room-user-info").on("room-user-info", (room, user) => {
    setUser(user);
    setRoom(room);
  });

  wsServer?.off("update-room").on("update-room", (room) => {
    setRoom(room);
  });

  const handleChangeTurn = (index: number, item: GameSymbols) => {
    if (!item && user?.symbol === room?.turn) {
      wsServer?.emit("change-turn", room?.id, user?.id);
      wsServer?.emit("change-field", room?.id, index, user?.symbol);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const roomId = localStorage.getItem("roomId");

    wsServer?.emit("get-user", userId, roomId);
  }, []);

  return (
    <>
      <GameRoomLayout room={room} handleChangeTurn={handleChangeTurn} />
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  );
};

export default GameRoomContainer;
