import { FavoriteTwoTone } from '@mui/icons-material';
import { Entry, HealthCheckRating } from '../../types';
import EntryBase from './EntryBase';
import { Box, SvgIconProps, Typography } from '@mui/material';

const EntryHealthCheck = ({ entry }: { entry: Entry }) => {
  if (entry.type === 'HealthCheck') {
    let color: SvgIconProps['color'];
    switch (entry.healthCheckRating) {
      case 0:
        color = 'success';
        break;
      case 1:
        color = 'warning';
        break;
      case 2:
        color = 'info';
        break;
      case 3:
        color = 'error';
        break;
    }
    return (
      <>
        <EntryBase entry={entry}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FavoriteTwoTone color={color} />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, textDecoration: 'underline' }}
            >
              {HealthCheckRating[entry.healthCheckRating]}
            </Typography>
          </Box>
        </EntryBase>
      </>
    );
  }
};

export default EntryHealthCheck;
