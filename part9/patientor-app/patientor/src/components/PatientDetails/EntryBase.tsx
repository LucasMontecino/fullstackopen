import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Diagnosis, Entry } from '../../types';
import { MedicalServices, MonitorHeart, Work } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import diagnosesService from '../../services/diagnoses';

const EntryBase = ({
  entry,
  children,
}: {
  entry: Entry;
  children: React.ReactNode;
}) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry.diagnosisCodes) {
      const fetchDiagnoses = async (): Promise<void> => {
        setLoading(true);
        try {
          const res = await diagnosesService.getAll();
          setDiagnoses(
            res.filter((d) => entry.diagnosisCodes?.includes(d.code))
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error({ error: error.message });
          }
        } finally {
          setLoading(false);
        }
      };
      fetchDiagnoses();
    }
  }, [entry.diagnosisCodes]);

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box>
            <Typography
              variant="body1"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}
            >
              {entry.date}{' '}
              {entry.type === 'OccupationalHealthcare' ? (
                <>
                  <Work fontSize="medium" /> <span>{entry.employerName}</span>
                </>
              ) : (
                <MedicalServices fontSize="medium" />
              )}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {entry.description}
            </Typography>
          </Box>

          {children}

          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
            loading ? (
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 6 }}>
                Loading...
              </Typography>
            ) : (
              <List>
                {diagnoses.map((d) => (
                  <ListItem key={d.code}>
                    <ListItemIcon>
                      <MonitorHeart fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={d.code} secondary={d.name} />
                  </ListItem>
                ))}
              </List>
            )
          ) : null}

          <Typography variant="caption">
            diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default EntryBase;
