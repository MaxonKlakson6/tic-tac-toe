import { ChangeEvent, FC, FormEvent } from "react";

import { ModalKeywords } from "../../types";
import ModalCreateRoom from "../ModalCreateRoom";
import ModalJoinRoom from "../ModalJoinRoom";

interface ModalWindowProps {
  modalKeyword: ModalKeywords;
  handleToggleModal: (keyword: ModalKeywords) => void;
  handleChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCreateRoom: (event: FormEvent) => void;
  handleJoinRoom: (event: FormEvent) => void;
}

const ModalWindow: FC<ModalWindowProps> = ({
  modalKeyword,
  handleToggleModal,
  handleChangeForm,
  handleCreateRoom,
  handleJoinRoom,
}) => {
  return (
    <>
      {modalKeyword === "roomName" && (
        <ModalCreateRoom
          modalKeyword={modalKeyword}
          handleToggleModal={handleToggleModal}
          handleChangeForm={handleChangeForm}
          handleCreateRoom={handleCreateRoom}
        />
      )}
      {modalKeyword === "yourName" && (
        <ModalJoinRoom
          modalKeyword={modalKeyword}
          handleToggleModal={handleToggleModal}
          handleChangeForm={handleChangeForm}
          handleJoinRoom={handleJoinRoom}
        />
      )}
    </>
  );
};

export default ModalWindow;
