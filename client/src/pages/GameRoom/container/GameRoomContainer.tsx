import { useContext, useEffect } from "react";
import { AppContext } from "../../../index";
import GameRoomLayout from "../components/GameRoomLayout";

const GameRoomContainer = () => {
  const wsServer = useContext(AppContext);
  useEffect(() => {
    return () => {
      wsServer?.emit("leave-room");
    };
  }, []);
  return <GameRoomLayout />;
};

export default GameRoomContainer;
