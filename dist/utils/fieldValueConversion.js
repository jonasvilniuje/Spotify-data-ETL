"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStringArray = exports.toBoolean = exports.toNumber = exports._toString = void 0;
// Conversion function for strings
const _toString = (input) => typeof input === 'string' ? input : null;
exports._toString = _toString;
// Conversion function for numbers
const toNumber = (input) => {
    const num = parseFloat(input);
    if (!isNaN(num)) {
        return num;
    }
    else {
        // Assuming reportError is a custom function you've defined elsewhere for logging or reporting errors.
        console.error(`Invalid input for number conversion: ${input}`);
        return null;
    }
};
exports.toNumber = toNumber;
// Conversion function for booleans
const toBoolean = (input) => {
    if (input === '1')
        return true;
    if (input === '0')
        return false;
    return null;
};
exports.toBoolean = toBoolean;
// Conversion function for string arrays (JSON-encoded)
const toStringArray = (input) => {
    try {
        // const parsed = JSON.parse(input.replace('"[', '[').replace(']"', ']').replace(/'/g, '"'));
        // const parsed = JSON.parse(input.replace(/'/g, '"'));
        const parsed = sanitizeAndParse(input);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
            return parsed;
        }
    }
    catch (e) {
        console.error('Error parsing JSON:', e);
    }
    return null;
};
exports.toStringArray = toStringArray;
function sanitizeAndParse(input) {
    let sanitizedInput = input;
    // Detect and handle Python-list-like strings
    if (sanitizedInput.startsWith("['") && sanitizedInput.endsWith("']")) {
        sanitizedInput = sanitizedInput.replace(/'/g, '"');
    }
    // Handle double-quoted strings (for JSON-like arrays)
    else if (sanitizedInput.startsWith('"["') && sanitizedInput.endsWith('"]"')) {
        sanitizedInput = sanitizedInput.slice(1, -1).replace(/""/g, '"');
    }
    // Convert single double-quoted inside (for JSON-like arrays within double quotes)
    sanitizedInput = sanitizedInput.replace(/""/g, '"');
    return parseJson(sanitizedInput);
}
function parseJson(sanitizedInput) {
    try {
        // Parse the sanitized input as JSON
        return JSON.parse(sanitizedInput);
    }
    catch (error) {
        console.error("Failed to parse:", sanitizedInput, "; Error:", error);
        return null;
    }
}
