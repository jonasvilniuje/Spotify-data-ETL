const fs = require('fs').promises;
import csv from 'csv-parser';
import { Track } from '@/interfaces/interfaces';

// should read csv files correctly
// should handle errors: file not found, etc...

describe('reading csv files', () => {
  it.skip("should read csv", async () => {
    let data;
    try {
      const filePath = 'data/unit-tests/trackWithMultipleArtists.csv';
  
      // Read the file asynchronously and wait for the result
      data = await fs.readFile(filePath, 'utf8');
  
      // Log the file data
      console.log(data);
    } catch (error) {
      // Handle any errors that occur during file reading
      console.error('Error reading file:', error);
      throw error; // Rethrow the error to fail the test
    }
  });

  it("should parse csv rows with lists correctly", async () => {

    const csvInput = `
    id, artists
    1MD0Obbza9l0t0Zpgcwagy, "['Dick Haymes', 'Gordon Jenkins', 'His Orchestra']"
    `;

    // logic??

    const targetOutput = {
        id: '1MD0Obbza9l0t0Zpgcwagy',
        artists: ['Dick Haymes', 'Gordon Jenkins', 'His Orchestra']
    }

  });

  // should crash if columns are missing
  // should take care of missing data
  // should handle invalid types properly
  // should convert types properly
  // should trim trailing whitespaces
  // ...
})