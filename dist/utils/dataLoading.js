"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCsvFile = void 0;
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
function conditionalLogic(data, conditions) {
    return conditions.every(condition => {
        const { columnName, predicate } = condition;
        return predicate(data[columnName]);
    });
}
function readCsvFile(filePath, conditions, schema) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(filePath);
            readStream
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => {
                if (conditionalLogic(data, conditions)) {
                    const validatedTrack = validateAndConvertRow(data, schema);
                    if (validatedTrack !== null) {
                        results.push(validatedTrack);
                    }
                }
            })
                .on('end', () => {
                console.log('end of reading csv file');
                resolve(results);
            })
                .on('error', reject);
        });
    });
}
exports.readCsvFile = readCsvFile;
function validateAndConvertRow(row, schema) {
    const result = {};
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
    return result;
}
