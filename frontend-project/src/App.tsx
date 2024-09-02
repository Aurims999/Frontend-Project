import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import artistsData from "./data/artists.json";

import Header from "./routes/header/Header.tsx";
import HomePage from "./routes/homePage/HomePage.tsx";
import ProfilePage from "./routes/profilePage/ProfilePage.tsx";
import { SettingsPage } from "./routes/settingsPage/SettingsPage.tsx";
import { ContentPreviewPage } from "./routes/ContentPreviewPage/ContentPreviewPage.tsx";

import { GuestPage } from "./routes/guestPage/GuestPage.tsx";
import { LoginPage } from "./routes/loginPage/LoginPage.tsx";

import "./index.css";

export type TCard = {
  id: number;
  image: string;
  link?: string;
  name: string;
  genres: string[];
};

function App() {
  const [artists, setArtists] = useState(artistsData);
  const [filteredArtists, setFilteredData] = useState(artists);

  return (
    <div className="appContainer">
      <Routes>
        <Route path="guest" element={<GuestPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={<Header data={artists} setResults={setFilteredData} />}
        >
          <Route index element={<HomePage artists={filteredArtists} />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="artist/:artistID" element={<ContentPreviewPage />} />
          <Route path="settings" element={<SettingsPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
