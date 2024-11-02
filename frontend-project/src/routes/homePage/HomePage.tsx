import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

const HomePage = ({ songs, artists, favouriteSongs }) => {
  const {currentUser, userData} = useContext(UserContext);
  const navigate = useNavigate();

  if (currentUser){
    return (
      <main>
        <ContentGrid title="Top tracks" amountOfColumns={5}>
        {songs.slice(0,15).map((entry) => {
            return (
              <Card
                key={entry.track.id}
                id={entry.track.id}
                image={entry.track.album.images[0].url}
                link={entry.track.external_urls.spotify}
                mainText={entry.track.name}
                subText={entry.track.artists[0].name}
                altText={`Image of ${entry.track.artists[0].name}`}
              />
            );
          })}
        </ContentGrid>
        <ContentGrid title="Favourite tracks" amountOfColumns={5}>
        {favouriteSongs.slice(0,15).map((entry) => {
            return (
              <Card
                key={entry.id}
                id={entry.id}
                image={entry.album.images[0].url}
                link={entry.external_urls.spotify}
                mainText={entry.name}
                subText={entry.artists[0].name}
                altText={`Image of ${entry.artists[0].name}`}
              />
            );
          })}
        </ContentGrid>
      </main>
    );
  } else {
    navigate("/guest");
  }
};

export default HomePage;
