import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import artistsData from "./data/artists.json";
import { UserContext } from "./context/UserContext.tsx";
import { WebManagementContext } from "./context/WebManagementContext.tsx";
import { userRoles } from "./utils/userRoles.js"

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

import { PageNotFound } from "./routes/pageNotFound/PageNotFound.tsx";
import { ScreenOverlay } from "./components/Containers/ScreenOverlayMessage/ScreenOverlay.tsx";

import { ProtectedRoutes } from "./utils/ProtectedRoutes.tsx";

import "./App.css";
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
  const [favouriteSongs, setFavouriteSongs] = useState([]);

  const {userData} = useContext(UserContext);
  const { isUserOnline } = useContext(WebManagementContext);

  //TODO:Move favourite songs retrieval logic to spotify data context
  const fetchFavouriteSongs = async () => {
    if (userData.favouriteArtists.length === 0) return;

    try {
      const artistsIds = userData.favouriteArtists.join(",");
      const response = await fetch(`http://localhost:5000/api/tracks?ids=${artistsIds}`);
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFavouriteSongs(data.tracks);
    } catch (error) {
      //TODO: Implement proper error handling for favourite songs retrieval
      console.error(error);
    }
  }

  useEffect(() => {
    if (userData === null) return;

    fetchFavouriteSongs();
  }, [userData]);

  return (
    <div className="appContainer">
      {!isUserOnline && <ScreenOverlay>TEST</ScreenOverlay>}
      <Routes>
        <Route element={<ProtectedRoutes requiredRole={userRoles.GUEST}/>}>
          <Route path="guest" element={<GuestPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoutes/>}>
          <Route
            path="/"
            element={<Header data={artists} setResults={setFilteredData} />}
          >
            <Route index element={<HomePage artists={filteredArtists} favouriteSongs={favouriteSongs}/>} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="artist/:artistID" element={<ContentPreviewPage />} />
            <Route path="settings" element={<SettingsPage/>}>
              <Route path="profileInfo" element={<ProfileInfo/>}/>
              <Route path="personalization" element={<PersonalizationPage/>}/>
              <Route element={<ProtectedRoutes requiredRole={userRoles.ADMIN}/>}>
                <Route path="reporting" element={<ReportingPage/>}/>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
