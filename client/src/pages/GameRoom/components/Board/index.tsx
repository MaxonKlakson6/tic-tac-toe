import styles from "./styles.module.css";
import { Room, GameSymbols } from "../../../Home/types";

interface BoardProps {
  room: Room | null;
  handleChangeTurn: (index: number, item: GameSymbols) => void;
}

const Board = ({ room, handleChangeTurn }: BoardProps) => {
  const mock = ["X", "O", "X", "O", "X", "O", "", "", ""];
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
