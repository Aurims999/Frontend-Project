import { SpotifyDataType } from "../../types/SpotifyAPI/DataType.js";

export const fetchDefaultPlaylists = async (ids, getDetailedData, getUserFavouriteTracks) => {
    let playlists = [];
    for(const id of ids){
        const playlist = await getDetailedData(id, SpotifyDataType.PLAYLIST);
        const playlistTracks = await getDetailedData(playlist.tracks, SpotifyDataType.TRACK);
        
        playlists.push({title: playlist.name, tracks: playlistTracks});
    }

    const userFavouriteTracks = await getUserFavouriteTracks();

    return {playlists, userFavouriteTracks} 
}

export const fetchProfilePageData = async (getUserFavouriteTracks, getUserFavouriteArtists) => {
    const userFavouriteTracks = await getUserFavouriteTracks();
    const userFavouriteArtists = await getUserFavouriteArtists();
    return {tracks: userFavouriteTracks, artists: userFavouriteArtists};
}
