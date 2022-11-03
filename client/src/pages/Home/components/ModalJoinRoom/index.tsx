import { ChangeEvent, FC, FormEvent } from "react";

import { ModalKeywords } from "../../types";

import styles from "./styles.module.css";

interface ModalJoinRoomProps {
  modalKeyword: ModalKeywords;
  handleToggleModal: (keyword: ModalKeywords) => void;
  handleChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  handleJoinRoom: (event: FormEvent) => void;
}

const ModalJoinRoom: FC<ModalJoinRoomProps> = ({
  modalKeyword,
  handleToggleModal,
  handleChangeForm,
  handleJoinRoom,
}) => {
  return (
    <form className={styles.wrapper} onSubmit={handleJoinRoom}>
      <div className={styles.inputHolder}>
        <input
          placeholder="Your name"
          name={modalKeyword}
          onChange={handleChangeForm}
        />
      </div>
      <div className={styles.controlButtonsHolder}>
        <button type="submit">Join room</button>
        <button onClick={() => handleToggleModal("")}>Cancel</button>
      </div>
    </form>
  );
};

export default ModalJoinRoom;
