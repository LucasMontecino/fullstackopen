import type { IDiaryStats } from '../types';

const DiaryStats = ({ label, stat }: IDiaryStats) => {
  return (
    <p style={{ display: 'flex', flexDirection: 'column' }}>
      <span>{label}:</span>
      <span
        style={{
          fontWeight: '700',
          color: '#289391',
        }}
      >
        {stat}
      </span>
    </p>
  );
};

export default DiaryStats;
