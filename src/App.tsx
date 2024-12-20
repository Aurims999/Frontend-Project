import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import artistsData from "./data/artists.json";
import { UserContext } from "./context/UserContext.tsx";

import Header from "./routes/header/Header.tsx";
import HomePage from "./routes/homePage/HomePage.tsx";
import ProfilePage from "./routes/profilePage/ProfilePage.tsx";
import { SettingsPage } from "./routes/settingsPage/SettingsPage.tsx";
import { ProfileInfo } from "./routes/settingsPage/ProfileInfo.tsx";
import { PersonalizationPage } from "./routes/settingsPage/PersonalizationPage.tsx";
import { ReportingPage } from "./routes/settingsPage/ReportingPage.tsx";

import { ContentPreviewPage } from "./routes/ContentPreviewPage/ContentPreviewPage.tsx";

import { GuestPage } from "./routes/guestPage/GuestPage.tsx";
import { LoginPage } from "./routes/loginPage/LoginPage.tsx";

import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";

import "./index.css";
import "./animations/animations.css"

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
  const [favouriteSongs, setFavouriteSongs] = useState([]);

  const {userData} = useContext(UserContext);

  const fetchFavouriteSongs = async () => {
    if (userData.favouriteArtists.length === 0) return;

    try {
      const artistsIds = userData.favouriteArtists.join(",");
      const response = await fetch(`http://localhost:5000/api/tracks?ids=${artistsIds}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFavouriteSongs(data.tracks);
    } catch (error) {
      console.error(error);
    }
  }

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
        console.error(error);
      }
    };

    fetchTopTracks();
  }, []);

  useEffect(() => {
    if (userData === null) return;

    fetchFavouriteSongs();
  }, [userData]);

  return (
    <div className="appContainer">
      <Routes>
        <Route path="guest" element={<GuestPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes/>}>
          <Route
            path="/"
            element={<Header data={artists} setResults={setFilteredData} />}
          >
            <Route index element={<HomePage songs={spotifyTracks} artists={filteredArtists} favouriteSongs={favouriteSongs}/>} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="artist/:artistID" element={<ContentPreviewPage />} />
            <Route path="settings" element={<SettingsPage/>}>
              <Route path="profileInfo" element={<ProfileInfo/>}/>
              <Route path="personalization" element={<PersonalizationPage/>}/>
              <Route element={<ProtectedRoutes requiredRole="ADMIN" navigateTo="/"/>}>
                <Route path="reporting" element={<ReportingPage/>}/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
