"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const schemas_1 = require("../schemas");
const toNewPatient = (obj) => {
    return schemas_1.NewPatientSchema.parse(obj);
};
exports.toNewPatient = toNewPatient;
