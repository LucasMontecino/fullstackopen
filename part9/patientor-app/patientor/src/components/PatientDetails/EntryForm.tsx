import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { EntryWithoutId, HealthCheckRating, } from '../../types';
import { useEntryForm } from '../../hooks/useEntryForm';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function EntryForm({
  handleClose,
  addEntry,
  id,
  loading,
}: {
  handleClose: () => void;
  addEntry: (id: string, entry: EntryWithoutId) => void;
  id: string;
  loading: boolean;
}) {
  const theme = useTheme();
  const { newEntry, handleSubmit, handleTypeChange, handleChange, handleDiagnosisChange, diagnosis, handleHealthCheckRatingChange } = useEntryForm(addEntry, handleClose, id);

  // Only numeric values from HealthCheckRating enum
  const healthCheckRatingValues = Object.values(HealthCheckRating).filter(
    (v) => typeof v === 'number'
  ) as number[];

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          New {newEntry.type} entry
        </Typography>
        <Box
          component={'form'}
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { my: 1 },
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit}
        >
          <Select
            name="type"
            value={newEntry.type}
            onChange={handleTypeChange}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          </Select>

          <TextField
            id="description"
            name="description"
            label="Description"
            placeholder="Description"
            value={newEntry.description}
            onChange={handleChange}
          />
          <InputLabel htmlFor="date">Date</InputLabel>
          <TextField
            id="date"
            name="date"
            placeholder="Date"
            value={newEntry.date}
            onChange={handleChange}
            type="date"
          />
          <TextField
            id="specialist"
            name="specialist"
            label="Specialist"
            placeholder="Specialist"
            value={newEntry.specialist}
            onChange={handleChange}
          />
          {newEntry.type === 'HealthCheck' && (
            <FormControl sx={{ my: 1 }}>
              <InputLabel id="healthcheck-rating">HealthCheckRating</InputLabel>
              <Select
                labelId="healthcheck-rating"
                id="healthcheck-rating"
                value={newEntry.healthCheckRating === undefined ? '' : [String(newEntry.healthCheckRating)]}
                onChange={handleHealthCheckRatingChange}
                input={<OutlinedInput label="HealthCheckRating" />}
                MenuProps={MenuProps}
              >
                {healthCheckRatingValues.map((rating) => (
                  <MenuItem key={rating} value={String(rating)}>
                    {HealthCheckRating[rating]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>)}
          {newEntry.type === 'OccupationalHealthcare' && (
            <>
              <TextField
                id="employerName"
                name="employerName"
                label="Employer Name"
                placeholder="Employer Name"
                value={newEntry.employerName}
                onChange={handleChange}
              />
              <InputLabel htmlFor="sickLeaveStartDate">Sick Leave Start Date</InputLabel>
              <TextField
                id="sickLeaveStartDate"
                name={`sickLeave.startDate`}
                placeholder="Sick Leave Start Date"
                value={newEntry.sickLeave?.startDate}
                type="date"
                onChange={handleChange}
              />
              <InputLabel htmlFor="sickLeaveEndDate">Sick Leave End Date</InputLabel>
              <TextField
                id="sickLeaveEndDate"
                name={`sickLeave.endDate`}
                placeholder="Sick Leave End Date"
                value={newEntry.sickLeave?.endDate}
                type="date"
                onChange={handleChange}
              />
            </>
          )}
          {newEntry.type === 'Hospital' && (
            <>
              <InputLabel htmlFor="dischargeDate">Discharge Date</InputLabel>
              <TextField
                id="dischargeDate"
                name={`discharge.date`}
                placeholder="Discharge Date"
                value={newEntry.discharge?.date}
                type="date"
                onChange={handleChange}
              />
              <TextField
                id="dischargeCriteria"
                name={`discharge.criteria`}
                label="Discharge Criteria"
                placeholder="Discharge Criteria"
                value={newEntry.discharge?.criteria}
                onChange={handleChange}
              />
            </>
          )}
          <FormControl sx={{ my: 1 }}>
            <InputLabel id="demo-multiple-name-label">Diagnoses</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="diagnoses-multi-select"
              multiple
              value={newEntry.diagnosisCodes}
              onChange={handleDiagnosisChange}
              input={<OutlinedInput label="Diagnoses" />}
              MenuProps={MenuProps}
            >
              {diagnosis.map((d) => (
                <MenuItem
                  key={d.code}
                  value={d.code}
                  style={getStyles(d.code, newEntry.diagnosisCodes || [], theme)}
                >
                  {d.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Loading' : 'Add'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
