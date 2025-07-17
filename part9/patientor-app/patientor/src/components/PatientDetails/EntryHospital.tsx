import { Box, Typography } from '@mui/material';
import { Entry } from '../../types';
import EntryBase from './EntryBase';
import { Done } from '@mui/icons-material';

const EntryHospital = ({ entry }: { entry: Entry }) => {
  if (entry.type === 'Hospital') {
    return (
      <>
        <EntryBase entry={entry}>
          <Box>
            <Typography variant="h5">Discharge:</Typography>
            <Typography variant="body1">{entry.discharge.date}</Typography>
            <Typography variant="subtitle1" sx={{ display: 'flex', gap: 0.5 }}>
              <Done fontSize="medium" color="success" />
              {entry.discharge.criteria}
            </Typography>
          </Box>
        </EntryBase>
      </>
    );
  }
};

export default EntryHospital;
