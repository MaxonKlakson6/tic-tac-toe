import { FC } from "react";

import Board from "../Board";
import GameOverModal from "../GameOverModal";
import UsersInfo from "../UsersInfo";

import { GameSymbols, Room } from "../../../Home/types";
import { GameOverMessage, User } from "../../types";

import styles from "./styles.module.css";

interface GameRoomLayoutProps {
  room: Room | null;
  player: User | null;
  message: GameOverMessage;
  handleChangeTurn: (index: number, item: GameSymbols) => void;
  handleLeaveRoom: () => void;
}

const GameRoomLayout: FC<GameRoomLayoutProps> = ({
  room,
  player,
  message,
  handleChangeTurn,
  handleLeaveRoom,
}) => {
  return (
    <div>
      <header className={styles.header}>
        <button onClick={handleLeaveRoom}>Leave</button>
      </header>
      <div className={styles.boardHolder}>
        <Board room={room} handleChangeTurn={handleChangeTurn} />
        <UsersInfo users={room?.users} player={player} />
        {message && (
          <GameOverModal message={message} handleLeaveRoom={handleLeaveRoom} />
        )}
      </div>
    </div>
  );
};

export default GameRoomLayout;
