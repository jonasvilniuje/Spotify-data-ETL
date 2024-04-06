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
const fs = require('fs').promises;
// should read csv files correctly
// should handle errors: file not found, etc...
describe('reading csv files', () => {
    it.skip("should read csv", () => __awaiter(void 0, void 0, void 0, function* () {
        let data;
        try {
            const filePath = 'data/unit-tests/trackWithMultipleArtists.csv';
            // Read the file asynchronously and wait for the result
            data = yield fs.readFile(filePath, 'utf8');
            // Log the file data
            console.log(data);
        }
        catch (error) {
            // Handle any errors that occur during file reading
            console.error('Error reading file:', error);
            throw error; // Rethrow the error to fail the test
        }
    }));
    it("should parse csv rows with lists correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const csvInput = `
    id, artists
    1MD0Obbza9l0t0Zpgcwagy, "['Dick Haymes', 'Gordon Jenkins', 'His Orchestra']"
    `;
        // logic??
        const targetOutput = {
            id: '1MD0Obbza9l0t0Zpgcwagy',
            artists: ['Dick Haymes', 'Gordon Jenkins', 'His Orchestra']
        };
    }));
    // should crash if columns are missing
    // should take care of missing data
    // should handle invalid types properly
    // should convert types properly
    // should trim trailing whitespaces
    // ...
});
