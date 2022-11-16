import { GameSymbols } from "../../Home/types";

export interface User {
  id: string;
  name: string;
  symbol: GameSymbols;
}

export type GameOverMessage = "Win: X" | "Win: O" | "Draw" | "";
