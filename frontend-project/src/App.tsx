import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import artistsData from "./data/artists.json";

import Header from "./routes/header/Header.tsx";
import HomePage from "./routes/homePage/HomePage.tsx";
import ProfilePage from "./routes/profilePage/ProfilePage.tsx";
import { ArtistPage } from "./routes/artistsPage/ArtistPage.tsx";

import { GuestPage_Header } from "./routes/guestPage/header/GuestPage_Header.tsx";
import { GuestPage } from "./routes/guestPage/GuestPage.tsx";

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
        <Route
          path="/"
          element={<Header data={artists} setResults={setFilteredData} />}
        >
          <Route index element={<HomePage artists={filteredArtists} />} />
          <Route path="myProfile" element={<ProfilePage />} />
          <Route path="artist/:artistID" element={<ArtistPage />} />
        </Route>
        <Route path="guest" element={<GuestPage_Header />}>
          <Route index element={<GuestPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
