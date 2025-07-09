"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    const patients = patientService_1.default.getNonSensitiveAll();
    res.status(200).json(patients);
    return;
});
patientRouter.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.status(201).json(addedPatient);
        return;
    }
    catch (error) {
        let errMsg = '';
        if (error instanceof Error) {
            errMsg += error.message;
        }
        res.status(400).json({ error: errMsg });
        return;
    }
});
exports.default = patientRouter;
