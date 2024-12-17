import { useEffect, useState } from "react";
import { createContext } from "react";

import { fetchPlaylist } from "../utils/spotify/spotifyAPI";
import { spotifyPlaylists } from "./../utils/spotify/spotifyPlaylists.js"


export const SpotifyDataContext = createContext({
    topTracksPlaylist: [],
    lithuanianTracksPlaylist: [],
    isDataLoading: null,
});

export const SpotifyDataProvider = ({children}) => {
  const [topTracksPlaylist, setTopTracks] = useState([]);
  const [lithuanianTracksPlaylist, setLithuanianTracks] = useState([]);
  const [isDataLoading, setLoading] = useState(true);
  const value = {topTracksPlaylist, lithuanianTracksPlaylist, isDataLoading};

  useEffect(() => {
    const fetchData = async () => {
      try{
        const topTracks = await fetchPlaylist(spotifyPlaylists.TOP_TRACKS);
        const lithuanianTracks = await fetchPlaylist(spotifyPlaylists.LITHUANIAN_TRACKS);
        setTopTracks(topTracks); 
        setLithuanianTracks(lithuanianTracks);
        setLoading(false);
      } catch (error){
        console.error("Error while fetching spotify playlists: ", error)
      }
    }

    fetchData();
  }, [])

  return <SpotifyDataContext.Provider value={value}>{children}</SpotifyDataContext.Provider>
}

