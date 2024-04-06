import type { Validator } from '@/types/types';

// Conversion function for strings
export const _toString: Validator<string> = (input) => typeof input === 'string' ? input : null;

// Conversion function for numbers
export const toNumber: Validator<number> = (input) => {
  const num = parseFloat(input);
  if (!isNaN(num)) {
    return num;
  } else {
    // Assuming reportError is a custom function you've defined elsewhere for logging or reporting errors.
    console.error(`Invalid input for number conversion: ${input}`);
    return null;
  }
};

// Conversion function for booleans
export const toBoolean: Validator<boolean> = (input) => {
  if (input === '1') return true;
  if (input === '0') return false;
  return null;
};

// Conversion function for string arrays (JSON-encoded)
export const toStringArray: Validator<string[]> = (input) => {
  try {
    const parsed = JSON.parse(input.replace(/'/g, '"'));
    
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed;
    }
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
  return null;
};