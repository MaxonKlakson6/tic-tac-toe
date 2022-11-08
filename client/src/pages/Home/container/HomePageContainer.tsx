import {
  FC,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import HomeLayout from "../components/HomeLayout";

import { useForm } from "../../../hooks";
import { AppContext } from "../../../index";

import { FormValues, ModalKeywords, Room } from "../types";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../../router/routeNames";

const HomePageContainer: FC = () => {
  const wsServer = useContext(AppContext);
  const navigate = useNavigate();

  const [modalKeyword, setModalKeyWord] = useState<ModalKeywords>("");
  const [form, handleChangeForm, resetField] = useForm<FormValues>({
    yourName: "",
    roomName: "",
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [idToJoin, setIdToJoin] = useState<string>("");

  const handleToggleModal = (keyword: ModalKeywords): void => {
    setModalKeyWord(keyword);
  };

  const handleCreateRoom = (event: FormEvent): void => {
    event.preventDefault();
    if (form.roomName.trim()) {
      wsServer?.emit("create-room", form.roomName, () => {
        resetField("roomName");
        handleToggleModal("");
      });
    } else {
      alert("wrong name");
    }
  };

  const handleStartJoin = useCallback((id: string) => {
    setIdToJoin(id);
    handleToggleModal("yourName");
  }, []);

  const handleJoinRoom = (event: FormEvent) => {
    event.preventDefault();

    if (form.yourName.trim()) {
      wsServer?.emit("join-room", { idToJoin, userName: form.yourName });
      resetField("yourName");
      handleToggleModal("");
    } else {
      alert("wrong data");
    }
  };

  wsServer?.off("send-rooms").on("send-rooms", (rooms) => {
    setRooms(rooms);
  });

  wsServer?.off("join-permission").on("join-permission", (roomName: string) => {
    navigate(`/game-room/${roomName}`);
  });

  useEffect(() => {
    wsServer?.emit("get-rooms");
  }, []);

  return (
    <HomeLayout
      rooms={rooms}
      modalKeyword={modalKeyword}
      handleToggleModal={handleToggleModal}
      handleChangeForm={handleChangeForm}
      handleCreateRoom={handleCreateRoom}
      handleStartJoin={handleStartJoin}
      handleJoinRoom={handleJoinRoom}
    />
  );
};

export default HomePageContainer;
