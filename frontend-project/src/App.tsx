import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import artistsData from "./data/artists.json";

import Header from "./routes/header/Header.tsx";
import HomePage from "./routes/homePage/HomePage.tsx";
import ProfilePage from "./routes/profilePage/ProfilePage.tsx";
import { SettingsPage } from "./routes/settingsPage/SettingsPage.tsx";
import { ProfileInfo } from "./routes/settingsPage/ProfileInfo.tsx";
import { PersonalizationPage } from "./routes/settingsPage/PersonalizationPage.tsx";

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
  const [spotifyTracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tracks/topTracks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const topTracks = await response.json();
        const songs = topTracks.tracks.items;
        setTracks(songs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <div className="appContainer">
      <Routes>
        <Route path="guest" element={<GuestPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={<Header data={artists} setResults={setFilteredData} />}
        >
          <Route index element={<HomePage songs={spotifyTracks} artists={filteredArtists} />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="artist/:artistID" element={<ContentPreviewPage />} />
          <Route path="settings" element={<SettingsPage/>}>
            <Route path="profileInfo" element={<ProfileInfo/>}/>
            <Route path="personalization" element={<PersonalizationPage/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
