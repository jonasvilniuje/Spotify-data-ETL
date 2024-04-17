export interface Track {
    id: string;
    name: string;
    popularity: number;
    duration_ms: number;
    explicit: boolean;
    artists: string[]; // Assuming this field contains JSON-encoded arrays
    id_artists: string[]; // Assuming this field contains JSON-encoded arrays
    release_date: string; // Or Date if you intend to convert the string to a Date object
    danceability: number | string; // todo: how to change type and leave the same column name
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    time_signature: number;
    year?: string;
    month?: string;
    day?: string;
}  

export interface Artist {
    id: string
    followers: number
    genres: string[]
    name: string
    popularity: number
}

export interface CsvRow {
    [key: string]: string;
}

export interface Condition {
    columnName: string;
    predicate: (value: string) => boolean;
}

export interface ValidationSchema<T> {
    validate(data: any): { valid: boolean, instance: T | null };
}