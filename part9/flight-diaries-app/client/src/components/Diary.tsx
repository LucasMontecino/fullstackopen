import type { NonSensitiveEntry } from '../types';
import DiaryStats from './DiaryStats';
import Header from './Header';

const Diary = ({ diary }: { diary: NonSensitiveEntry }) => {
  return (
    <div
      style={{ border: '1px solid #ccc', borderRadius: 6, padding: '0 4px' }}
    >
      <Header text={diary.date} variant="h3" />
      <div>
        <DiaryStats label="Weather" stat={diary.weather} />
        <DiaryStats label="Visibility" stat={diary.visibility} />
      </div>
    </div>
  );
};

export default Diary;
