import { Route, Routes } from "react-router-dom";

import HomePageContainer from "../pages/Home/container/HomePageContainer";
import GameRoomContainer from "../pages/GameRoom/container/GameRoomContainer";

import { ROUTE_NAMES } from "./routeNames";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.HOME} element={<HomePageContainer />} />
      <Route path={ROUTE_NAMES.GAME_ROOM} element={<GameRoomContainer />} />
    </Routes>
  );
};

export default Router;
