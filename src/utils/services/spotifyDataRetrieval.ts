import { useContext } from "react";
import { SpotifyDataContext } from "../../context/SpotifyDataContext.js";

import { spotifyPlaylists } from "./../../utils/spotify/spotifyPlaylists.js"

// export const fetchDefaultPlaylists = async () => {
//     const {getPlaylist} = useContext(SpotifyDataContext);
//     try{
//         const topTracks = await getPlaylist(spotifyPlaylists.TOP_TRACKS);
//         const lithuanianTracks = await getPlaylist(spotifyPlaylists.LITHUANIAN_TRACKS);

//         return {topTracks, lithuanianTracks}
        
//     } catch (error){
//         //TODO: Implement proper error handling logic for Spotify API data retrieval
//         console.error("Error while fetching spotify playlists: ", error)
//         return null;
//     }
// }

export const fetchTrack = async (trackId) => {
    const {getTrack} = useContext(SpotifyDataContext);

    const track = await getTrack(trackId);
    if (track === null) {
        console.log("Non-existing artist ID");
        return {};
    }
    return track;
};