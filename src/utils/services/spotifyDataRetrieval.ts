import { fetchPlaylist } from "../spotify/spotifyAPI";
import { spotifyPlaylists } from "./../../utils/spotify/spotifyPlaylists.js"

export const fetchDefaultPlaylists = async () => {
    try{
        const topTracks = await fetchPlaylist(spotifyPlaylists.TOP_TRACKS);
        const lithuanianTracks = await fetchPlaylist(spotifyPlaylists.LITHUANIAN_TRACKS);

        return {topTracks, lithuanianTracks}
        
    } catch (error){
        //TODO: Implement proper error handling logic for Spotify API data retrieval
        console.error("Error while fetching spotify playlists: ", error)
        return null;
    }
}