require('module-alias/register');
import dataLoading = require('@/utils/dataLoading');
import type { Track, Artist, Condition } from '@/interfaces/interfaces';
import {trackSchema, artistSchema} from '@/schemas/trackSchema'

const trackConditions = [
  {
    columnName: 'name',
    predicate: (value: string) => value !== ''
  },
  {
    columnName: 'duration_ms',
    predicate: (value: string) => parseInt(value, 10) >= 60000
  }
];

async function read_and_transformData() {
  // const validTracks = await dataLoading.readCsvFile<Track>('data/tracksTest.csv', trackConditions, trackSchema);
  const validTracks = await dataLoading.readCsvFile<Track>('data/tracks.csv', trackConditions, trackSchema);
  // const transformedTracks = transform...

  // Get unique artist IDs from valid tracks
  const validArtistIds = new Set(validTracks.flatMap(track => {    
    return track.id_artists
  }));

  // const allArtists = await dataLoading.readCsvFile<Artist>('data/artistsTest.csv', [], artistSchema);
  const allArtists = await dataLoading.readCsvFile<Artist>('data/artists.csv', [], artistSchema);
  
  // Filter artists based on valid track IDs
  const validArtists = allArtists.filter((artist) => {
    return validArtistIds.has(artist.id)
  });

  console.log('Filtered artists:', validArtists);
}

read_and_transformData();

