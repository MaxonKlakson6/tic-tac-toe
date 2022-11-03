import { ChangeEvent, FC, FormEvent } from "react";

import { ModalKeywords } from "../../types";

import styles from "./styles.module.css";

interface ModalCreateRoomProps {
  modalKeyword: ModalKeywords;
  handleToggleModal: (keyword: ModalKeywords) => void;
  handleChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCreateRoom: (event: FormEvent) => void;
}

const ModalCreateRoom: FC<ModalCreateRoomProps> = ({
  modalKeyword,
  handleToggleModal,
  handleChangeForm,
  handleCreateRoom,
}) => {
  return (
    <form className={styles.wrapper} onSubmit={handleCreateRoom}>
      <div className={styles.inputHolder}>
        <input
          placeholder="Room name"
          name={modalKeyword}
          onChange={handleChangeForm}
        />
      </div>
      <div className={styles.controlButtonsHolder}>
        <button type="submit">Create room</button>
        <button onClick={() => handleToggleModal("")}>Cancel</button>
      </div>
    </form>
  );
};

export default ModalCreateRoom;
