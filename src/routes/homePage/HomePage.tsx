import Card from "../../components/Card/Card";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

import { useContext } from "react";
import { SpotifyDataContext } from "../../context/SpotifyDataContext";

const HomePage = ({ artists, favouriteSongs }) => {
  const {topTracksPlaylist, lithuanianTracksPlaylist} = useContext(SpotifyDataContext);

  return (
    <main>
      <ContentGrid title="Top tracks" amountOfColumns={5}>
      {(topTracksPlaylist.tracks?.items ?? []).slice(0,5).map((entry) => {
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
      <ContentGrid title="🇱🇹 Lithuanian tracks" amountOfColumns={5}>
      {(lithuanianTracksPlaylist.tracks?.items ?? []).slice(0,5).map((entry) => {
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
      {favouriteSongs.slice(0,5).map((entry) => {
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
};

export default HomePage;
