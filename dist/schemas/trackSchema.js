"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistSchema = exports.trackSchema = void 0;
const fieldValueConversion_1 = require("@/utils/fieldValueConversion");
exports.trackSchema = {
    id: fieldValueConversion_1._toString,
    name: fieldValueConversion_1._toString,
    popularity: fieldValueConversion_1.toNumber,
    duration_ms: fieldValueConversion_1.toNumber,
    explicit: fieldValueConversion_1.toBoolean,
    artists: fieldValueConversion_1.toStringArray,
    id_artists: fieldValueConversion_1.toStringArray,
    release_date: fieldValueConversion_1._toString, // Or toDateString for converting to a Date object
    danceability: fieldValueConversion_1.toNumber,
    energy: fieldValueConversion_1.toNumber,
    key: fieldValueConversion_1.toNumber,
    loudness: fieldValueConversion_1.toNumber,
    mode: fieldValueConversion_1.toNumber,
    speechiness: fieldValueConversion_1.toNumber,
    acousticness: fieldValueConversion_1.toNumber,
    instrumentalness: fieldValueConversion_1.toNumber,
    liveness: fieldValueConversion_1.toNumber,
    valence: fieldValueConversion_1.toNumber,
    tempo: fieldValueConversion_1.toNumber,
    time_signature: fieldValueConversion_1.toNumber,
};
exports.artistSchema = {
    id: fieldValueConversion_1._toString,
    followers: fieldValueConversion_1.toNumber,
    genres: fieldValueConversion_1.toStringArray,
    name: fieldValueConversion_1._toString,
    popularity: fieldValueConversion_1.toNumber
};
