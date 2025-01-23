import { Playlist } from "../../types/SpotifyAPI/Playlist";
import { Track } from "../../types/SpotifyAPI/Track";
import { DataEntry } from "../../types/SpotifyAPI/DataEntry";
import { Artist } from "../../types/SpotifyAPI/Artist";

const fetchData = async (url : string) => {
  try{
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      return {};
    }

    const data = await response.json();
    return data

  } catch (error) {
    //TODO: Implement proper error handling for fetchPlaylist() method
    console.error("Error while fetching data: ", error)
    return {};
  }
}

//#region DTO FILTERING
const getArtistsFromDTO = (data: object) : DataEntry[] => {
  const artists : DataEntry[] = data.artists.filter(artist => {
    return {
      id: artist.id,
      type: artist.type,
      name: artist.name,
      href: artist.href,
    };
  })

  return artists;
}

const getTrackAlbumFromDTO = (data: Track) : DataEntry => {
  const trackAlbum : DataEntry = {
    id: data.album.id,
    type: data.album.type,
    name: data.album.name,
    image: data.album.images[0].url,
    href: data.album.href,
  }

  return trackAlbum
}

const extractTracks = (data: Track[]): Track[] => {
  data = Array.isArray(data) ? data : [data];
  const tracks: Track[] = data.map(track => {
    const trackAlbum = getTrackAlbumFromDTO(track);
    const trackArtists = getArtistsFromDTO(track);

    return {
      id: track.id,
      type: track.type,
      name: track.name,
      image: track.album.images[0].url,
      description: track.artists.map(artist => artist.name).join(", "),
      href: track.href,
      album: trackAlbum,
      artist: trackArtists, 
      explicit: track.explicit,
    };
  });

  return tracks;
};

//#endregion

//#region ARTIST
export const fetchArtistData = async (artistId : string) : Promise<{ artist: Artist; artistTracks: Track[] }> => {
  const data = await fetchData(`http://localhost:5000/api/artists/${artistId}`);
  const artistTracks : Track[] = await fetchArtistTracks(artistId);

  const artist : Artist = {
    id: data.id,
    type: data.type,
    name: data.name,
    image: data.images[0].url,
    href: data.href,
    followers: data.followers.total,
    genres: data.genres,
    popularity: data.popularity,
    tracks: artistTracks.map(track => track.id),
  }
  
  return {artist, artistTracks}
}
//#endregion

//#region TRACK
export const fetchTrackData = async (trackId : string): Promise<Track> => {
  const data = await fetchData(`http://localhost:5000/api/tracks/${trackId}`);
  const track = extractTracks(data);

  return track[0];
}

export const fetchArtistTracks = async (artistId : string): Promise<Track[]> => {
  const data = await fetchData(`http://localhost:5000/api/artists/topTracks/${artistId}`);
  const artistTracks = await extractTracks(data.tracks);
  return artistTracks
}
//#endregion

export const fetchPlaylist = async (playlistId : string): Promise<{playlist: Playlist, playlistTracks: Track[]}> => {
  const {playlistInfo, playlistTracks} = await fetchData(`http://localhost:5000/api/tracks/playlist/${playlistId}`);
  const playlistOwner : DataEntry = {
    id: playlistInfo.owner.id,
    type: playlistInfo.owner.type,
    name: playlistInfo.owner.display_name,
    href: playlistInfo.owner.href,
  };

  let tracks = playlistTracks.map(trackData => trackData.track);

  tracks = extractTracks(tracks);
  const playlistTracksIds = tracks.map(track => track.id);

  const playlist: Playlist = {
    id: playlistInfo.id,
    type: playlistInfo.type,
    name: playlistInfo.name,
    image: playlistInfo.images[0].url,
    description: playlistInfo.description,
    href: playlistInfo.href,
    followers: playlistInfo.followers.total,
    owner: playlistOwner,
    public: playlistInfo.public,
    tracks: playlistTracksIds,
  }

  return {playlist, playlistTracks};
}