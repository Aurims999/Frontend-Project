import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ContentBlock from "./components/ContentBlock/ContentBlock.tsx";
import artistsData from "./data/artists.json";

import Header from "./routes/header/Header.tsx";
import HomePage from "./routes/homePage/HomePage.tsx";

export type TCard = {
  id: number;
  image: string;
  link?: string;
  name: string;
  genres: string[];
};

/* function App() {
  const [artists, setArtists] = useState(artistsData);
  const [filteredArtists, setFilteredData] = useState(artists);

  return (
    <>
      <header>
        <Header data={artists} setSearchResult={setFilteredData} />
      </header>
      <main>
        <ContentBlock
          content={filteredArtists.slice(0, 15)}
          contentTitle={"My favourite artist"}
          layout={true}
        />
      </main>
    </>
  );
} */

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
