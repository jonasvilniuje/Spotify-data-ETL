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
        const parsed = JSON.parse(input.replace(/'/g, '"'));
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
