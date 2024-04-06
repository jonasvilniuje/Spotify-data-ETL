import type {Track, Artist, Condition } from '@/interfaces/interfaces';
import {Validator, ValidationSchema} from '@/types/types'
import {toNumber, toBoolean, _toString, toStringArray} from '@/utils/fieldValueConversion'

export const trackSchema: ValidationSchema<Track> = {
    id: _toString,
    name: _toString,
    popularity: toNumber,
    duration_ms: toNumber,
    explicit: toBoolean,
    artists: toStringArray,
    id_artists: toStringArray,
    release_date: _toString, // Or toDateString for converting to a Date object
    danceability: toNumber,
    energy: toNumber,
    key: toNumber,
    loudness: toNumber,
    mode: toNumber,
    speechiness: toNumber,
    acousticness: toNumber,
    instrumentalness: toNumber,
    liveness: toNumber,
    valence: toNumber,
    tempo: toNumber,
    time_signature: toNumber,
  };
  
export const artistSchema: ValidationSchema<Artist> = {
    id: _toString,
    followers: toNumber,
    genres: toStringArray,
    name: _toString,
    popularity: toNumber
}
