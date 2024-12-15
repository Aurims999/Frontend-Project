import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/UserContext.tsx";
import { SpotifyDataProvider } from "./context/SpotifyDataContext.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SpotifyDataProvider>
          <App />
        </SpotifyDataProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
