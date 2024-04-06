import * as fs from 'fs';
import csv from 'csv-parser';
import type {Track, Artist, Condition } from '@/interfaces/interfaces';
import type { ValidationSchema } from '@/types/types';


function conditionalLogic(data: any, conditions: Condition[]) {
  return conditions.every(condition => {
    const { columnName, predicate } = condition;
    return predicate(data[columnName]);
  });
}

export async function readCsvFile<T>(filePath: string, conditions: Condition[], schema: ValidationSchema<T>): Promise<T[]> {
  const results: T[] = [];

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csv())
      .on('data', (data) => {
        
        if (conditionalLogic(data, conditions)) {          
          const validatedTrack = validateAndConvertRow<T>(data, schema);
          if(validatedTrack !== null) {
            results.push(validatedTrack as T);
          }
        }
      })
      .on('end', () => {
        console.log('end of reading csv file');
        resolve(results);
      })
      .on('error', reject);
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
