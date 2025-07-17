import { Box, Typography } from '@mui/material';
import { Entry } from '../../types';
import EntryDetails from './EntryDetails';

export default function Entries({ entries }: { entries: Entry[] }) {
  return entries.length > 0 ? (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
          mt: 2,
        }}
      >
        {entries.map((entry) => (
          <EntryDetails entry={entry} key={entry.id} />
        ))}
      </Box>
    </>
  ) : (
    <>
      <Typography variant="body1">No entries found</Typography>
    </>
  );
}
