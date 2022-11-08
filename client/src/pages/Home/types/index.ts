export interface FormValues {
  yourName: string;
  roomName: string;
}

export type GameSymbols = "" | "O" | "X";

type User = {
  id: string;
  name: string;
  symbol: GameSymbols;
};

export type ModalKeywords = keyof FormValues | "";

export interface Room {
  id: string;
  roomName: string;
  users: User[];
  fields: GameSymbols[];
  turn: GameSymbols;
}
