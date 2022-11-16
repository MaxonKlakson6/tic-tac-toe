import { FC } from "react";

import { GameOverMessage } from "../../types";

import styles from "./styles.module.css";

interface GameOverModalProps {
  message: GameOverMessage;
  handleLeaveRoom: () => void;
}

const GameOverModal: FC<GameOverModalProps> = ({
  message,
  handleLeaveRoom,
}) => {
  return (
    <>
      <div className={styles.wrapper}></div>
      <div className={styles.modal}>
        <p className={styles.text}>{message}</p>
        <button onClick={handleLeaveRoom} className={styles.btn}>
          Leave
        </button>
      </div>
    </>
  );
};

export default GameOverModal;
