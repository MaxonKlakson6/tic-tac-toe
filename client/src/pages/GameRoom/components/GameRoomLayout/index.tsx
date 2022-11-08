import Board from "../Board";
import { GameSymbols, Room } from "../../../Home/types";

interface GameRoomLayoutProps {
  room: Room | null;
  handleChangeTurn: (index: number, item: GameSymbols) => void;
}

const GameRoomLayout = ({ room, handleChangeTurn }: GameRoomLayoutProps) => {
  return (
    <div>
      <header style={{ padding: 20, borderBottom: "1px solid red" }}>
        <button>Leave</button>
      </header>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Board room={room} handleChangeTurn={handleChangeTurn} />
        <div>aboba</div>
      </div>
    </div>
  );
};

export default GameRoomLayout;
