"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const ssn_1 = require("ssn");
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(gender);
};
const isSSN = (ssn) => {
    const parseSSN = new ssn_1.ParseSSN(ssn);
    return Boolean(parseSSN);
};
const parseName = (name) => {
    if (!isString(name))
        throw new Error('incorrect or missing name');
    return name;
};
const parseDateOfBirth = (date) => {
    if (!isString(date) || !isDate(date))
        throw new Error('incorrect or missing date');
    return date;
};
const parseSSN = (ssn) => {
    if (!ssn)
        return '';
    if (!isString(ssn) || !isSSN(ssn))
        throw new Error('incorrect or missing ssn');
    return ssn;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender))
        throw new Error('incorrect or missing gender: ' + gender);
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation))
        throw new Error('incorrect or missing occupation');
    return occupation;
};
const toNewPatient = (obj) => {
    if (!obj || typeof obj !== 'object')
        throw new Error('incorrect data');
    if ('name' in obj &&
        'dateOfBirth' in obj &&
        'ssn' in obj &&
        'gender' in obj &&
        'occupation' in obj) {
        const newPatient = {
            name: parseName(obj.name),
            dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
            ssn: parseSSN(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseOccupation(obj.occupation),
        };
        return newPatient;
    }
    throw new Error('incorrect or missing data');
};
exports.toNewPatient = toNewPatient;
