import Header from "./components/header/Header.tsx";
import ContentBlock from "./components/ContentBlock/ContentBlock.tsx";
import artistsData from "./data/artists.json";
import { useState } from "react";

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
}

export default App;
