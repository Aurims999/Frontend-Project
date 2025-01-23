import { useEffect, useState } from "react";
import { createContext } from "react";

import { fetchPlaylist, fetchTrackData } from "../utils/spotify/spotifyAPI";
import { fetchArtistData } from "../utils/spotify/spotifyAPI";

import { Track } from "../types/SpotifyAPI/Track";
import { Artist } from "../types/SpotifyAPI/Artist";
import { Playlist } from "../types/SpotifyAPI/Playlist";


export const SpotifyDataContext = createContext({
    isDataLoading: null,
    getTrack: (id) => null,
    getArtist: (id) => null,
    getPlaylist: (id) => null,
});

export const SpotifyDataProvider = ({children}) => {
  const [isDataLoading, setLoadingStatus] = useState(false);

  const tracks = new Map<string, Track>();
  const artists = new Map<string, Artist>();
  const playlists = new Map<string, Playlist[]>();

  const getTrack = async (trackId: string) : Promise<Track> => {
    if (tracks.has(trackId)) return tracks.get(trackId);

    const track = await fetchTrackData(trackId);
    const artistData = await fetchArtistData(track.artist[0].id);

    if (track){
      tracks.set(trackId, track);
    }

    return track;
  }

  const getArtist = async (artistId: string) : Promise<Artist> => {
    if (artists.has(artistId)) return artists.get(artistId);

    const {artist, artistTracks} = await fetchArtistData(artistId);
    artistTracks.forEach(track => {
      if(!tracks.has(track.id)) tracks.set(track.id, track);
    });

    if (artist){
      artists.set(artist.id, artist);
    }

    return artist;
  }

  const getPlaylist = async (playlistId : string) : Promise<Playlist> => {
    if (playlists.has(playlistId)) return playlists.get(playlistId);

    const {playlist, playlistTracks} = await fetchPlaylist(playlistId);
    playlistTracks.forEach(track => {
      if(!tracks.has(track.id)) tracks.set(track.id, track);
    });

    if (playlist){
      playlists.set(playlist.id, playlist);
    }

    return playlist;
  }

  const value = {isDataLoading, getTrack, getArtist, getPlaylist};

  return <SpotifyDataContext.Provider value={value}>{children}</SpotifyDataContext.Provider>
}

