import { useContext } from "react";
import { SpotifyDataContext } from "../../context/SpotifyDataContext.js";

export const fetchTrack = async (trackId) => {
    const {getTrack} = useContext(SpotifyDataContext);
    const track = await getTrack(trackId);
    if (track === null) {
        console.log("Non-existing artist ID");
        return {};
    }
    return track;
};

