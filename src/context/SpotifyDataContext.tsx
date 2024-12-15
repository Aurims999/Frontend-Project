import { useEffect, useState } from "react";
import { createContext } from "react";

import { fetchPlaylist } from "../utils/spotify/spotifyAPI";

const spotifyPlaylists = {
  TOP_TRACKS : "774kUuKDzLa8ieaSmi8IfS",
  LITHUANIAN_TRACKS : "1aBdxOSUcvFRrS7Qxn5pnw",
}

export const SpotifyDataContext = createContext({
    topTracks: [],
    lithuanianTracks: []
});

export const SpotifyDataProvider = ({children}) => {
  const [topTracks, setTopTracks] = useState([]);
  const [lithuanianTracks, setLithuanianTracks] = useState([]);
  const value = {topTracks, lithuanianTracks};

  useEffect(() => {
    const fetchData = async () => {
      try{
        setTopTracks(await fetchPlaylist(spotifyPlaylists.TOP_TRACKS)); 
        setLithuanianTracks(await fetchPlaylist(spotifyPlaylists.LITHUANIAN_TRACKS));
      } catch (error){
        console.error("Error while fetching spotify playlists: ", error)
      }
    }

    fetchData();
  }, [])

  return <SpotifyDataContext.Provider value={value}>{children}</SpotifyDataContext.Provider>
}

