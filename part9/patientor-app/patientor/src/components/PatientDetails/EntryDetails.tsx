import { Entry } from '../../types';
import { assertNever } from '../../utils';
import EntryHealthCheck from './EntryHealthCheck';
import EntryHospital from './EntryHospital';
import EntryOccupationalHealthcare from './EntryOccupationalHealthcare';

export default function EntryDetails({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case 'Hospital':
      return <EntryHospital entry={entry} />;
    case 'HealthCheck':
      return <EntryHealthCheck entry={entry} />;
    case 'OccupationalHealthcare':
      return <EntryOccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
}
