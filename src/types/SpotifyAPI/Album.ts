import { DataEntry } from "./DataEntry";

export interface Album extends DataEntry {
    total_tracks: number,
    release_date: string,
    artists: DataEntry[],
    tracks_items: DataEntry[],
    genres: string[],
    label: string | null | undefined,
}