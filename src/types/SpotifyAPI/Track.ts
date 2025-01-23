import { DataEntry } from "./DataEntry";

/*
    Example:

    const track: Track = {
        id: data.id,
        type: data.type,
        name: data.name,
        image: data.album.images[0].url,
        description: data.artists.map(artist => artist.name).join(", "),
        href: data.href,
        album: trackAlbum,
        artist: trackArtists,
        explicit: data.explicit,
    }
*/

export interface Track extends DataEntry{
    album: DataEntry,
    artist: DataEntry[],
    explicit: boolean,
}