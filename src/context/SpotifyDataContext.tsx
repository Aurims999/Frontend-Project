import { useEffect, useState } from "react";
import { createContext } from "react";

import { fetchDefaultPlaylists } from "../utils/services/spotifyDataRetrieval";


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
        setLoading(true);
        const {topTracks, lithuanianTracks} = await fetchDefaultPlaylists();
        setTopTracks(topTracks); 
        setLithuanianTracks(lithuanianTracks);
        setLoading(false);
      } catch (error){
        //TODO: Implement proper error handling logic for Spotify API data retrieval
        console.error("Error while fetching spotify playlists: ", error)
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  return <SpotifyDataContext.Provider value={value}>{children}</SpotifyDataContext.Provider>
}

