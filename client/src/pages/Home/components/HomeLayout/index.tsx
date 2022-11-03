import { ChangeEvent, FC, FormEvent } from "react";

import ModalWindow from "../ModalWindow";
import RoomItem from "../RoomItem";

import { ModalKeywords, Room } from "../../types";

import styles from "./styles.module.css";

interface HomeLayoutProps {
  rooms: Room[];
  modalKeyword: ModalKeywords;
  handleToggleModal: (keyword: ModalKeywords) => void;
  handleChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCreateRoom: (event: FormEvent) => void;
  handleStartJoin: (id: string) => void;
  handleJoinRoom: (event: FormEvent) => void;
}

const HomeLayout: FC<HomeLayoutProps> = ({
  rooms,
  modalKeyword,
  handleToggleModal,
  handleChangeForm,
  handleCreateRoom,
  handleStartJoin,
  handleJoinRoom,
}) => {
  return (
    <div>
      <header className={styles.header}>
        <button onClick={() => handleToggleModal("roomName")}>
          Create room
        </button>
      </header>
      <div className={styles.roomsHolder}>
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            roomName={room.roomName}
            count={room.users.count}
            id={room.id}
            onStartJoin={handleStartJoin}
          />
        ))}
      </div>
      {modalKeyword && (
        <ModalWindow
          handleToggleModal={handleToggleModal}
          modalKeyword={modalKeyword}
          handleChangeForm={handleChangeForm}
          handleCreateRoom={handleCreateRoom}
          handleJoinRoom={handleJoinRoom}
        />
      )}
    </div>
  );
};

export default HomeLayout;
