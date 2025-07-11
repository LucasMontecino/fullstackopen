"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const middlewares_1 = require("../middlewares");
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    const patients = patientService_1.default.getNonSensitiveAll();
    res.status(200).json(patients);
    return;
});
patientRouter.post('/', middlewares_1.newDiaryParser, (req, res, next) => {
    try {
        const addedPatient = patientService_1.default.addPatient(req.body);
        res.status(201).json(addedPatient);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.default = patientRouter;
