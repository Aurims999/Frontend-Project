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

export const fetchContentPreviewData = async (dataID : string, contentType : SpotifyDataType, getDetailedData) => {
    if (dataID == null) return;

    let relatedContent = null;

    switch(contentType){
        case SpotifyDataType.ARTIST: {
            const artistData = await getArtist(dataID, getDetailedData);
            const artistTracks = await getTracks(artistData.tracks, getDetailedData)
            relatedContent = {mainContent: artistData, relatedTracks : [{artist: artistData, tracks : artistTracks}]};
            break;
        }
        case SpotifyDataType.TRACK: {
            const trackData = await getTracks(dataID, getDetailedData);
            const relatedArtistsData = await getArtistTracks(trackData.artist, getDetailedData);
            relatedContent = {mainContent: trackData, relatedTracks : relatedArtistsData};
        }
    }
    
    return relatedContent;
}

const getTracks = async (trackIds, getDetailedData) => {
    const tracks = await getDetailedData(trackIds, SpotifyDataType.TRACK)
    return tracks;
}

const getArtist = async (artistId, getDetailedData) => {
    const artist = await getDetailedData(artistId, SpotifyDataType.ARTIST);
    return artist;
}

const getArtistTracks = async (relatedArtists, getDetailedData) => {
    let relatedArtistData = [];
    for(const trackArtist of relatedArtists){
        const artist = await getArtist(trackArtist.id, getDetailedData);
        const tracks = await getTracks(artist.tracks, getDetailedData);
        relatedArtistData.push({artist, tracks});
    }

    return relatedArtistData;
}
