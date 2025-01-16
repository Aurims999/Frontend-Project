import { DataEntry } from "./DataEntry";

export interface Playlist extends DataEntry {
    description: string,
    followers: number,
    owner: DataEntry,
    public: boolean,
    tracks: DataEntry[],
}