import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { io, Socket } from "socket.io-client";
import { HashRouter } from "react-router-dom";

import Router from "./router";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const AppContext = createContext<Socket | null>(null);

const wsServer = io("http://localhost:5000");

root.render(
  <HashRouter>
    <AppContext.Provider value={wsServer}>
      <Router />
    </AppContext.Provider>
  </HashRouter>
);
