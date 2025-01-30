import { DataEntry } from "./DataEntry";

export interface Track extends DataEntry{
    album: DataEntry,
    artist: DataEntry[],
    explicit: boolean,
}