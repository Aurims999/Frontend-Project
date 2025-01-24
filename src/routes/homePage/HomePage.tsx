import Card from "../../components/Card/Card";
import { ContentGrid } from "../../components/Containers/ContentGrid/ContentGrid";

import { useContext, useEffect, useState } from "react";
import { SpotifyDataContext } from "../../context/SpotifyDataContext";
import { WebManagementContext } from "../../context/WebManagementContext.js";
import { spotifyPlaylists } from "./../../utils/spotify/spotifyPlaylists.js"

const HomePage = () => {
  const {getPlaylist, getTrack} = useContext(SpotifyDataContext);
  const {setPageLoading} = useContext(WebManagementContext)
  const [defaultPlaylists, setdefaultPlaylists] = useState([]);

  const defaultPlaylistsIDs = [
    spotifyPlaylists.TOP_TRACKS,
    spotifyPlaylists.LITHUANIAN_TRACKS,
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
      {/* <ContentGrid title="Favourite tracks" amountOfColumns={5}>
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
      </ContentGrid> */}
    </main>
  );
};

export default HomePage;
