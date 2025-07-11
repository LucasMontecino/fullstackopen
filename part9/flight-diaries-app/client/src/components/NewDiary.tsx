import Header from './Header';
import { useDiaryForm } from '../hooks/useDiaryForm';
import Error from './Error';
import DiaryForm from './DiaryForm';
import type { INewDiary } from '../types';

const NewDiary = ({ addDiary, error, setError }: INewDiary) => {
  const { newDiary, handleChange, handleSubmit } = useDiaryForm(
    addDiary,
    setError
  );

  return (
    <div>
      <Header text="Add new diary" variant="h2" />
      <Error error={error} />
      <DiaryForm
        newDiary={newDiary}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <hr />
    </div>
  );
};

export default NewDiary;
