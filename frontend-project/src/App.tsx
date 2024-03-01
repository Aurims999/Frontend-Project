import { Component } from "react";

import Header from "./components/header/Header.tsx";
import ContentBlock from "./components/ContentBlock/ContentBlock.tsx";

const cards = [
  {
    id: 1,
    image: "./assets/images/artists/adele.jpg",
    link: "",
    name: "Adele",
    genres: ["Pop", "Soul"],
  },
  {
    id: 2,
    image: "./assets/images/artists/monika liu.jpg",
    link: "",
    name: "Monika Liu",
    genres: ["Pop"],
  },
];

function App() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <ContentBlock
          content={cards}
          contentTitle={"My favourite artist"}
          layout={true}
        />
      </main>
    </>
  );
}

export default App;
