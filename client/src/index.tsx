import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { io, Socket } from "socket.io-client";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const AppContext = createContext<Socket | null>(null);

const wsServer = io("http://localhost:5000");

root.render(
  <AppContext.Provider value={wsServer}>
    <App />
  </AppContext.Provider>
);
