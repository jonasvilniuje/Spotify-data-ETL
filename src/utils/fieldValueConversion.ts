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
    const parsed = sanitizeAndParse(input)
    
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed;
    }
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
  return null;
};

function sanitizeAndParse(input: any) {
  // console.log(`input: ${typeof input} ${input}`);
  
  let sanitizedInput = input.trim();

  // Detect and handle Python-list-like strings
  if (sanitizedInput.startsWith(`['`) && sanitizedInput.endsWith(`']`)) {
    sanitizedInput = sanitizedInput.replace(/'/g, `"`);
  }
  // Handle double-quoted strings (for JSON-like arrays)
  else if (sanitizedInput.startsWith(`"["`) && sanitizedInput.endsWith(`"]"`)) {
    sanitizedInput = sanitizedInput.slice(1, -1).replace(/""/g, `"`);
  }
  // Convert single double-quoted inside (for JSON-like arrays within double quotes)
  sanitizedInput = sanitizedInput.replace(/""/g, `"`);
  sanitizedInput = parseJson(sanitizedInput);
  if (sanitizedInput != null && typeof sanitizedInput != 'object') sanitizedInput = sanitizeAndParse(sanitizedInput);
  
  return sanitizedInput;
}

function parseJson(sanitizedInput: any) {
  try {
    // Parse the sanitized input as JSON    
    return JSON.parse(sanitizedInput);
  } catch (error) {
    console.error("Failed to parse:", sanitizedInput, "; Error:", error);
    return null;
  }
}


