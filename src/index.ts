require('module-alias/register');
import dataLoading = require('@/utils/dataLoading');
import {trackConditions} from '@/constants/conditions'
import {trackSchema, artistSchema} from '@/schemas/trackSchema'

async function readAndTransformData() {
  const validTracks = await dataLoading.readCsvFileTracks('data/tracksTest.csv', trackConditions, trackSchema);
  // const validTracks = await dataLoading.readCsvFile<Track>('data/tracks.csv', trackConditions, trackSchema);
  // console.log('validTracks: ', validTracks);
  
  // Get unique artist IDs from valid tracks
  const validArtistIds = new Set(validTracks.flatMap(track => {    
    return track.id_artists
  }));
  
  // console.log(validArtistIds);
  
  const allArtists = await dataLoading.readCsvFileArtists('data/artistsTest.csv', [], artistSchema);
  // // const allArtists = await dataLoading.readCsvFile<Artist>('data/artists.csv', [], artistSchema);
  
  // // Filter artists based on valid track IDs
  const validArtists = allArtists.filter((artist) => {
    return validArtistIds.has(artist.id)
  });

  // console.log('Filtered artists:', validArtists);
}


readAndTransformData()
  .then(() => console.log('Data processing completed'))
  .catch((err) => console.error('Error during processing:', err));