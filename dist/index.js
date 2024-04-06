"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const dataLoading = require("./utils/dataLoading");
const trackSchema_1 = require("./schemas/trackSchema");
const trackConditions = [
    {
        columnName: 'name',
        predicate: (value) => value !== ''
    },
    {
        columnName: 'duration_ms',
        predicate: (value) => parseInt(value, 10) >= 60000
    }
];
function read_and_transformData() {
    return __awaiter(this, void 0, void 0, function* () {
        const validTracks = yield dataLoading.readCsvFile('data/tracksTest.csv', trackConditions, trackSchema_1.trackSchema);
        // const transformedTracks = transform...
        // Get unique artist IDs from valid tracks
        const validArtistIds = new Set(validTracks.flatMap(track => {
            return track.id_artists;
        }));
        const allArtists = yield dataLoading.readCsvFile('data/artistsTest.csv', [], trackSchema_1.artistSchema);
        // Filter artists based on valid track IDs
        const validArtists = allArtists.filter((artist) => {
            return validArtistIds.has(artist.id);
        });
        if (validArtists.length < 10)
            console.log('Filtered artists:', validArtists);
    });
}
read_and_transformData();
