import { Box, Typography } from '@mui/material';
import { Entry } from '../../types';
import EntryBase from './EntryBase';
import { daysLicence } from '../../utils';

const EntryOccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  if (entry.type === 'OccupationalHealthcare') {
    return (
      <>
        <EntryBase entry={entry}>
          <Box>
            <Typography variant="h5">Sick Leave:</Typography>
            {entry.sickLeave && entry.sickLeave.startDate && entry.sickLeave.endDate ? (
              <>
                <Typography variant="subtitle1">
                  From: {entry.sickLeave.startDate}
                </Typography>
                <Typography variant="subtitle1">
                  To: {entry.sickLeave.endDate}
                </Typography>
                <Typography variant="subtitle1">
                  Total Sick Leave Days:{' '}
                  {daysLicence(
                    entry.sickLeave.startDate,
                    entry.sickLeave.endDate
                  )}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">No sick leave data found</Typography>
            )}
          </Box>
        </EntryBase>
      </>
    );
  }
};

export default EntryOccupationalHealthcare;
