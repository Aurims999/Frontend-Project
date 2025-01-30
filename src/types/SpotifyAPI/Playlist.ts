import { DataEntry } from "./DataEntry";

export interface Playlist extends DataEntry {
    followers: number,
    owner: DataEntry,
    public: boolean,
    tracks: string[],
}