import { useState, useEffect } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";
import diagnoses from "../services/diagnoses";
import { SelectChangeEvent } from "@mui/material";

export const useEntryForm = (addEntry: (id: string, entry: EntryWithoutId) => void, handleClose: () => void, id: string) => {
    const [newEntry, setNewEntry] = useState<EntryWithoutId>({
        date: '',
        description: '',
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.Healthy,
        specialist: '',
        diagnosisCodes: [],
    });

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnosis = async () => {
            const res = await diagnoses.getAll();
            setDiagnosis(res);
        };
        fetchDiagnosis();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Handle nested properties like discharge.date, sickLeave.startDate, etc.
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setNewEntry((prev) => {
                // Only update if the parent property exists and is an object
                const parentValue = (prev as Record<string, unknown>)[parent];
                if (parent in prev && typeof parentValue === 'object' && parentValue !== null) {
                    return {
                        ...prev,
                        [parent]: {
                            ...(parentValue as object),
                            [child]: value,
                        },
                    };
                }
                return prev;
            });
            return;
        }

        // Special handling for healthCheckRating
        if (name === 'healthCheckRating') {
            setNewEntry((prev) => ({
                ...prev,
                healthCheckRating: Number(value),
            }));
            return;
        }

        // Default: update top-level property
        setNewEntry((prev) => ({ ...prev, [name]: value }));
    };

    const handleDiagnosisChange = (e: SelectChangeEvent<string[]>) => {
        const value = e.target.value;
        setNewEntry((prev) => ({
            ...prev,
            diagnosisCodes: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleHealthCheckRatingChange = (e: SelectChangeEvent<string[]>) => {
        const value = e.target.value;
        setNewEntry((prev) => ({
            ...prev,
            healthCheckRating: Number(value),
        }));
    };

    const handleTypeChange = (e: SelectChangeEvent) => {
        const type = e.target.value as EntryWithoutId['type'];
        switch (type) {
            case 'HealthCheck':
                setNewEntry({
                    date: '',
                    description: '',
                    type: 'HealthCheck',
                    healthCheckRating: HealthCheckRating.Healthy,
                    specialist: '',
                    diagnosisCodes: [],
                });
                break;
            case 'Hospital':
                setNewEntry({
                    date: '',
                    description: '',
                    type: 'Hospital',
                    specialist: '',
                    diagnosisCodes: [],
                    discharge: { date: '', criteria: '' },
                });
                break;
            case 'OccupationalHealthcare':
                setNewEntry({
                    date: '',
                    description: '',
                    type: 'OccupationalHealthcare',
                    specialist: '',
                    diagnosisCodes: [],
                    employerName: '',
                    sickLeave: { startDate: '', endDate: '' },
                });
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await addEntry(id, newEntry);

        setNewEntry({
            date: '',
            description: '',
            type: 'HealthCheck',
            healthCheckRating: HealthCheckRating.Healthy,
            specialist: '',
            diagnosisCodes: [],
        });
        handleClose();
    };


    return {
        newEntry,
        handleSubmit,
        handleTypeChange,
        handleChange,
        handleDiagnosisChange,
        handleHealthCheckRatingChange,
        diagnosis,
    };
};