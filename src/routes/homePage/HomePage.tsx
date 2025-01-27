import Card from "../../components/Card/Card";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

import { useContext, useEffect, useState } from "react";
import { SpotifyDataContext } from "../../context/SpotifyDataContext";
import { WebManagementContext } from "../../context/WebManagementContext.js";
import { spotifyPlaylists } from "./../../utils/spotify/spotifyPlaylists.js"

const HomePage = () => {
  const {getPlaylist, getTrack, getUserFavouriteTracks} = useContext(SpotifyDataContext);
  const {setPageLoading} = useContext(WebManagementContext)
  const [defaultPlaylists, setdefaultPlaylists] = useState([]);
  const [favouriteTracks, setFavouriteTracks] = useState([]);

  const defaultPlaylistsIDs = [
    spotifyPlaylists.TOP_TRACKS,
    spotifyPlaylists.LITHUANIAN_TRACKS,
    spotifyPlaylists.ALL_TIME_HITS,
  ]

  useEffect(() => {
    setPageLoading(true);

    const fetchDefaultPlaylists = async () => {
      let playlists = [];
      for(const id of defaultPlaylistsIDs){
        const playlist = await getPlaylist(id);
        const playlistTracks = await Promise.all(
          playlist.tracks.map((trackID) => getTrack(trackID))
        );
        playlists.push({title: playlist.name, tracks: playlistTracks});
      }

      setdefaultPlaylists(playlists);
      const userFavouriteTracks = await getUserFavouriteTracks();
      setFavouriteTracks(userFavouriteTracks);
      setPageLoading(false);
    }

    fetchDefaultPlaylists();
  }, [])
  
  return (
    <main>
      {defaultPlaylists.map(playlist => {
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
      {favouriteTracks.map((track) => {
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
