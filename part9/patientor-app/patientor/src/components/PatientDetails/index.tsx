import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Patient from './Patient';
import EntryForm from './EntryForm';
import patientsService from '../../services/patients';
import { AxiosError } from 'axios';
import { usePatientDetails } from '../../hooks/usePatientDetails';
import { EntryWithoutId } from '../../types';

export default function PatientDetails() {
  const { id } = useParams();
  const { patient, setPatient } = usePatientDetails(id);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!patient) {
    return (
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 6 }}>
        Loading...
      </Typography>
    );
  }

  const handleClose = () => setOpenModal(false);

  const handleOpen = () => setOpenModal(true);

  const addEntry = async (id: string, obj: EntryWithoutId) => {
    setLoading(true);
    setError('');
    try {
      const addedEntry = await patientsService.update(id, obj);

      setPatient({ ...patient, entries: addedEntry.entries });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error({ error: error.message });
        setError(error.response?.data?.error[0]?.message);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Patient
        id={patient.id}
        name={patient.name}
        gender={patient.gender}
        occupation={patient.occupation}
        ssn={patient.ssn}
        entries={patient.entries}
        openModal={openModal}
        handleOpen={handleOpen}
        error={error}
      >
        <EntryForm
          handleClose={handleClose}
          addEntry={addEntry}
          id={patient.id}
          loading={loading}
        />
      </Patient>
    </div>
  );
}
