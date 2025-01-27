import { useState, useContext, useRef } from "react";
import { createContext } from "react";

import { UserContext } from "./UserContext";

import { fetchPlaylist, fetchTrackData } from "../utils/spotify/spotifyAPI";
import { fetchArtistData } from "../utils/spotify/spotifyAPI";

import { Track } from "../types/SpotifyAPI/Track";
import { Artist } from "../types/SpotifyAPI/Artist";
import { Playlist } from "../types/SpotifyAPI/Playlist";
import { SpotifyDataType } from "../types/SpotifyAPI/DataType";


export const SpotifyDataContext = createContext({
    isDataLoading: null,
    getTrack: (id : string) => {},
    getArtist: (id : string) => {},
    getPlaylist: (id : string) => {},
    getDetailedData: (id: string, dataType: string) => {},
    getUserFavouriteTracks : () => {},
});

export const SpotifyDataProvider = ({children}) => {
  const [isDataLoading, setLoadingStatus] = useState(false);
  const {userData} = useContext(UserContext);

  const tracks = useRef(new Map<string, Track>());
  const artists = useRef(new Map<string, Artist>());
  const playlists = useRef(new Map<string, Playlist[]>());

  const getTrack = async (trackId: string) : Promise<Track> => {
    if (tracks.current.has(trackId)) return tracks.current.get(trackId);

    const track = await fetchTrackData(trackId);
    const artistData = await fetchArtistData(track.artist[0].id);

    if (track){
      tracks.current.set(trackId, track);
    }

    return track;
  }

  const getArtist = async (artistId: string) : Promise<Artist> => {
    if (artists.current.has(artistId)) return artists.current.get(artistId);

    const {artist, artistTracks} = await fetchArtistData(artistId);
    artistTracks.forEach(track => {
      if(!tracks.current.has(track.id)) tracks.current.set(track.id, track);
    });

    if (artist){
      artists.current.set(artist.id, artist);
    }

    return artist;
  }

  const getPlaylist = async (playlistId : string) : Promise<Playlist> => {
    if (playlists.current.has(playlistId)) {
      return playlists.current.get(playlistId)
    };

    const {playlist, playlistTracks} = await fetchPlaylist(playlistId);
    playlistTracks.forEach(track => {
      if(!tracks.current.has(track.id)) tracks.current.set(track.id, track);
    });

    if (playlist){
      playlists.current.set(playlist.id, playlist);
    }

    return playlist;
  }

  const getDetailedData = async (dataID : string, dataType : SpotifyDataType) => {
    try{
        if (!dataID) return null;
  
        let data = null;
        switch (dataType) {
            case SpotifyDataType.TRACK:
              data = await getTrack(dataID);
              break;
            case SpotifyDataType.ARTIST:
              data = await getArtist(dataID);
              break;
            default:
              console.error("INVALID CONTENT TYPE");
        }
          
        if (data === null) console.error("Non-existing artist ID");
  
        return data;
    } catch (error) {
        console.error("Error while fetching data: ", error);
        return null;
    }
  }

  const getUserFavouriteTracks = async () => {
    let favouriteTracks = []
    for (const trackId of userData.favouriteSongs){
      const track = await getDetailedData(trackId, SpotifyDataType.TRACK);
      favouriteTracks.push(track);
    }

    return favouriteTracks;
  }

  const value = {isDataLoading, getTrack, getArtist, getPlaylist, getDetailedData, getUserFavouriteTracks};

  return <SpotifyDataContext.Provider value={value}>{children}</SpotifyDataContext.Provider>
}

