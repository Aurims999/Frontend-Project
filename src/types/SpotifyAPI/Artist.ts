import { DataEntry } from "./DataEntry";

export interface Artist extends DataEntry {
    followers: number,
    genres: string[],
    popularity: number,
    tracks: string[],
}