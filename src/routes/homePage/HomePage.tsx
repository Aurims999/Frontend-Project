import Card from "../../components/Card/Card";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

import { useContext, useEffect, useState } from "react";
import { SpotifyDataContext } from "../../context/SpotifyDataContext";
import { WebManagementContext } from "../../context/WebManagementContext.js";
import { spotifyPlaylists } from "./../../utils/spotify/spotifyPlaylists.js"

import { fetchDefaultPlaylists } from "../../utils/services/spotifyDataRetrieval.ts";

const HomePage = () => {
  const {getDetailedData, getUserFavouriteTracks} = useContext(SpotifyDataContext);
  const {setPageLoading} = useContext(WebManagementContext)
  const [defaultPlaylists, setDefaultPlaylists] = useState([]);
  const [favouriteTracks, setFavouriteTracks] = useState([]);

  const defaultPlaylistsIDs = [
    spotifyPlaylists.TOP_TRACKS,
    spotifyPlaylists.LITHUANIAN_TRACKS,
    spotifyPlaylists.ALL_TIME_HITS,
  ]

  useEffect(() => {
    setPageLoading(true);
    fetchDefaultPlaylists(defaultPlaylistsIDs, getDetailedData, getUserFavouriteTracks)
    .then(({playlists, userFavouriteTracks}) => {
      setDefaultPlaylists(playlists);
      setFavouriteTracks(userFavouriteTracks);
    }).finally(() => setPageLoading(false));
  }, [])
  
  return (
    <main>
      {defaultPlaylists?.map(playlist => {
        return(
          <ContentGrid title={playlist.title} amountOfColumns={5} key={playlist.title}>
            {(playlist.tracks ?? []).slice(0,5).map((track) => {
              return (
                <Card
                  key={track.id}
                  data = {track}
                />
              );
            })}
          </ContentGrid> 
        )
      })}
      <ContentGrid title="Favourite tracks" amountOfColumns={5}>
      {favouriteTracks?.map((track) => {
          return (
            <Card
              key={track.id}
              data={track}
            />
          );
        })}
      </ContentGrid>
    </main>
  );
};

export default HomePage;
