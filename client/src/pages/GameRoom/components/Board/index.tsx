import { FC } from "react";

import { Room, GameSymbols } from "../../../Home/types";

import styles from "./styles.module.css";

interface BoardProps {
  room: Room | null;
  handleChangeTurn: (index: number, item: GameSymbols) => void;
}

const Board: FC<BoardProps> = ({ room, handleChangeTurn }) => {
  return (
    <div className={styles.board}>
      {room?.fields.map((item, index) => (
        <div
          key={index}
          className={styles.cell}
          onClick={() => handleChangeTurn(index, item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Board;
