import Header from "./components/header/Header.tsx";
import ContentBlock from "./components/ContentBlock/ContentBlock.tsx";
import artists from "./data/artists.json"

export type TCard = {
  id: number,
  image: string,
  link?: string,
  name: string,
  genres: string[],
}

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <ContentBlock
          content={artists.slice(0, 15)}
          contentTitle={"My favourite artist"}
          layout={true}
        />
      </main>
    </>
  );
}

export default App;
