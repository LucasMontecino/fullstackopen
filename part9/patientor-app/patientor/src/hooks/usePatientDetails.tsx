import { useEffect, useState } from "react";
import patients from "../services/patients";
import { Patient as IPatient } from "../types";

export const usePatientDetails = (id: string | undefined) => {
    const [patient, setPatient] = useState<IPatient | null>(null);

    useEffect(() => {
        if (id) {
            const fetchPatient = async (): Promise<void> => {
                const res = await patients.findById(id);
                setPatient(res);
            };
            fetchPatient();
        }

        return () => {
            setPatient(null);
        };
    }, [id]);

    return { patient, setPatient };
};