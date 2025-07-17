import { Female, Male, Transgender } from '@mui/icons-material';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Patient as IPatient } from '../../types';
import Entries from './Entries';

export default function Patient({
  name,
  gender,
  ssn,
  occupation,
  entries,
  children,
  openModal,
  handleOpen,
  error,
}: Omit<IPatient, 'dateOfBirth'> & {
  children: React.ReactNode;
  openModal: boolean;
  handleOpen: () => void;
  error: string;
}) {
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <Typography variant="h2">{name}</Typography>{' '}
        {gender === 'male' ? (
          <Male fontSize="large" />
        ) : gender === 'female' ? (
          <Female fontSize="large" />
        ) : (
          <Transgender fontSize="large" />
        )}
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1">ssh: {ssn}</Typography>
        <Typography variant="body1">occupation: {occupation}</Typography>
      </Box>
      {error !== '' && (
        <Alert variant="filled" color="error">
          {error}
        </Alert>
      )}
      {openModal && children}
      <Box>
        <Typography variant="h3">entries</Typography>
        <Entries entries={entries} />
      </Box>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpen}>
        Add new entry
      </Button>
    </>
  );
}
