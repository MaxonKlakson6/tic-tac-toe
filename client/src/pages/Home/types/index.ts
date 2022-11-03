export interface FormValues {
  yourName: string;
  roomName: string;
}

export type ModalKeywords = keyof FormValues | "";

export interface Room {
  id: string;
  roomName: string;
  users: {
    count: 0 | 1 | 2;
  };
}
