import type { NonSensitiveEntry } from '../types';
import Diary from './Diary';
import Header from './Header';

const DiaryList = ({ diaries }: { diaries: NonSensitiveEntry[] }) => {
  return (
    <div>
      <Header text="Diary List" variant="h2" />
      {!diaries.length ? (
        <p>No diaries found</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {diaries.map((d) => (
            <Diary key={d.id} diary={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DiaryList;
