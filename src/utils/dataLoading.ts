/* the main file used for data loading and transforming during loading
this approach might be not the most optimal
but it prevents from iterating through large CSV datasets multiple times */

import * as fs from 'fs';
import csv from 'csv-parser';
import type {Track, Artist, Condition } from '@/interfaces/interfaces';
import type { ValidationSchema } from '@/types/types';
import {DanceabilityCategory} from '@/constants/categories'

const AWS = require('aws-sdk');
const { PassThrough } = require('stream');

// Configure the AWS SDK
AWS.config.update({
  region: process.env.REGION, // Change to your region
  credentials: new AWS.Credentials(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY)
});

const s3 = new AWS.S3();

function conditionalLogic(data: any, conditions: Condition[]) {
  return conditions.every(condition => {
    const { columnName, predicate } = condition;
    return predicate(data[columnName]);
  });
}

export async function readCsvFileTracks(filePath: string, conditions: Condition[], schema: ValidationSchema<Track>): Promise<void> {
  const validArtistIds = new Set();
  const batch: Track[] = [];
  const batchSize = 5; // Define your batch size
  let batchIndex = 0;


  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csv())
      .on('data', (data: any) => {
          if (conditionalLogic(data, conditions)) {
              let validatedTrack = validateAndConvertRow<Track>(data, schema);
              if (validatedTrack !== null) {
                  validatedTrack = transformTrack(validatedTrack, data);
                  batch.push(validatedTrack);

                  // Save valid artists IDs
                  validatedTrack.id_artists.flatMap(id_artist => {
                    validArtistIds.add(id_artist)
                    return id_artist
                  });
                  
                  if (batch.length >= batchSize) {
                      uploadToS3(batch, batchIndex++);
                      batch.length = 0; // Clear the batch
                  }
              }
          }
      })
      .on('end', () => {
          if (batch.length > 0) {
              uploadToS3(batch, batchIndex); // Upload the last batch
          }
          console.log('End of reading Track CSV file');
          resolve();
      })
      .on('error', (error) => {
          console.error('Error reading the Track CSV file:', error);
          reject(error);
      });
  });
}

export async function readCsvFileArtists(filePath: string, conditions: Condition[], schema: ValidationSchema<Artist>): Promise<Artist[]> {
  const results: Artist[] = [];

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csv())
      .on('data', (data: Artist) => {
        
        if (conditionalLogic(data, conditions)) {          
          const validatedArtist = validateAndConvertRow<Artist>(data, schema);
          if(validatedArtist !== null) {
            results.push(validatedArtist as Artist);
          }
        }
      })
      .on('end', () => {
        console.log('End of reading Artist CSV file');
        resolve(results);
      })
      .on('error', (error) => {
        console.error('Error reading the Artist CSV file:', error);
        reject(error);
    });
  });
}

function validateAndConvertRow<T>(row: any, schema: ValidationSchema<T>): T | null {
  const result: Partial<T> = {};

  for (const key in schema) {
    const validator = schema[key];
    const value = row[key];
    const validatedValue = validator(value);
    
    if (validatedValue === null) {
      console.error(`Invalid or missing property - ${key}: unsupported value ${value}`);
      return null;
    }
    result[key] = validatedValue;
  }

  return result as T;
}

function transformTrack(validatedTrack: Track, data: any) {
  // Apply transformations
  // Explode date
  const dateParts = explodeDate(data.release_date);
  validatedTrack.year = dateParts.year;
  validatedTrack.month = dateParts.month;
  validatedTrack.day = dateParts.day;

  // Transform danceability number -> string
  validatedTrack.danceability = transformDanceability(data.danceability);
  return validatedTrack;
  // results.push(validatedTrack as Track); // todo: remove later
}

function explodeDate(releaseDate: string): { year: string, month: string, day: string } {
  try {
    let [year, month, day] = releaseDate.split('-');
    if (!month) month = '01';  // Default to January if no month is provided
    if (!day) day = '01';      // Default to the first day if no day is provided
    return { year, month, day };
  } catch (err) {
    console.error("Invalid date format:", releaseDate);
    return { year: "0000", month: "01", day: "01" }; // Handling unexpected format
  }
}

function transformDanceability(value: number | string) {
  try {
    value = Number(value)
  } catch(err) {
    console.error('Invalid danceability format:', err)
    return DanceabilityCategory.INVALID;
  }

  if (value >= 0 && value < 0.5) {
    return DanceabilityCategory.LOW;
  } else if (value >= 0.5 && value <= 0.6) {
    return DanceabilityCategory.MEDIUM;
  } else if (value > 0.6 && value <= 1) {
    return DanceabilityCategory.HIGH;
  } else {
    return DanceabilityCategory.INVALID;
  }
}

function uploadToS3(data: any[], batchIndex: number) {
  const pass = new PassThrough();
  const params = {
      Bucket: 'spotify-etl-task-ts',
      Key: `data-batch-${batchIndex}.json`,
      Body: pass
  };

  s3.upload(params, (err: any, data: any) => {
      if (err) {
          console.error('Error uploading to S3:', err);
      } else {
          console.log('Upload Success', data.Location);
      }
  });

  pass.write(JSON.stringify(data));
  pass.end();
}
