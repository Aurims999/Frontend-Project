import { useState, useContext, useRef } from "react";
import { createContext } from "react";

import { UserContext } from "./UserContext";

import { fetchPlaylist, fetchTrackData, fetchArtistData, fetchMultipleTracks, fetchMultipleArtists } from "../utils/spotify/spotifyAPI";

import { Track } from "../types/SpotifyAPI/Track";
import { Artist } from "../types/SpotifyAPI/Artist";
import { Playlist } from "../types/SpotifyAPI/Playlist";
import { SpotifyDataType } from "../types/SpotifyAPI/DataType";


export const SpotifyDataContext = createContext({
    isDataLoading: null,
    getDetailedData: (id: string, dataType: string) => {},
    getUserFavouriteTracks : () => {},
    getUserFavouriteArtists : () => {},
});

export const SpotifyDataProvider = ({children}) => {
  const [isDataLoading, setLoadingStatus] = useState(false);
  const {userData} = useContext(UserContext);

  const tracks = useRef(new Map<string, Track>());
  const artists = useRef(new Map<string, Artist>());
  const playlists = useRef(new Map<string, Playlist[]>());

  const getTrack = async (trackId: string) : Promise<Track> => {
    if (tracks.current.has(trackId)) {
      return tracks.current.get(trackId)!
    };

    const track = await fetchTrackData(trackId);

    if (track){
      tracks.current.set(trackId, track);
    }

    return track;
  }

  const getMultipleTracks = async (tracksIds : string[]) : Promise<Track[]> => {
    let requestedTracks = [];
    let missingTracksIds = "";
    for(const trackID of tracksIds){
      if(tracks.current.has(trackID)) {
        requestedTracks.push(tracks.current.get(trackID))
      } else {
        missingTracksIds += trackID + ",";
      }
    }

    if(missingTracksIds != ""){
      const remainingTracks = await fetchMultipleTracks(missingTracksIds);
      remainingTracks.forEach(track => {
        tracks.current.set(track.id, track);
        requestedTracks.push(track);
      });
    }

    return requestedTracks;
  }

  const getArtist = async (artistId: string) : Promise<Artist> => {
    if (artists.current.has(artistId)) {
      return artists.current.get(artistId);
    }

    const {artist, artistTracks} = await fetchArtistData(artistId);
    artistTracks.forEach(track => {
      if(!tracks.current.has(track.id)) tracks.current.set(track.id, track);
    });

    if (artist){
      artists.current.set(artist.id, artist);
    }

    return artist;
  }

  const getMultipleArtists = async (artistIds : string[]) => {
    let requestedArtists = [];
    let missingArtistIds = "";
    for(const artistID of artistIds){
      if(artists.current.has(artistID)) {
        requestedArtists.push(artists.current.get(artistID))
      } else {
        missingArtistIds += artistID + ",";
      }
    }

    if(missingArtistIds != ""){
      const remainingArtists = await fetchMultipleArtists(missingArtistIds);
      remainingArtists.forEach(artist => {
        tracks.current.set(artist.id, artist);
        requestedArtists.push(artist);
      });
    }

    return requestedArtists;
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

  const getDetailedData = async (dataID : string | string[], dataType : SpotifyDataType) => {
    try{
        if (!dataID) return null;
  
        let data = null;
        switch (dataType) {
            case SpotifyDataType.TRACK:
              data = await Array.isArray(dataID) ? getMultipleTracks(dataID) : getTrack(dataID);
              break;
            case SpotifyDataType.ARTIST:
              data = await Array.isArray(dataID) ? getMultipleArtists(dataID) : getArtist(dataID);
              break;
            case SpotifyDataType.PLAYLIST:
              data = await getPlaylist(dataID);
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
    const favouriteTracks = await getDetailedData(userData.favouriteSongs, SpotifyDataType.TRACK);

    return favouriteTracks;
  }

  const getUserFavouriteArtists = async () => {
    const favouriteArtists = await getDetailedData(userData.favouriteArtists, SpotifyDataType.ARTIST);

    return favouriteArtists;
  }

  const value = {isDataLoading, getDetailedData, getUserFavouriteTracks, getUserFavouriteArtists};

  return <SpotifyDataContext.Provider value={value}>{children}</SpotifyDataContext.Provider>
}

