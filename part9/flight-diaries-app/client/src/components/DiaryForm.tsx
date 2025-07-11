import { Visibility, Weather, type IDiaryForm } from '../types';
import Button from './Button';
import DiaryInput from './DiaryInput';
import DiaryRadioButtonGroup from './DiaryRadioButtonGroup';

const DiaryForm = ({ newDiary, handleChange, handleSubmit }: IDiaryForm) => {
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 36 }}>
      <DiaryInput
        label="Date"
        name="date"
        onChange={handleChange}
        type="date"
        value={newDiary.date}
      />

      <div style={{ marginBottom: 10 }}>
        <DiaryRadioButtonGroup<Weather>
          name="weather"
          title="Weather"
          options={Object.values(Weather).map((v) => ({
            label: v[0].toUpperCase() + v.slice(1),
            value: v,
          }))}
          onChange={handleChange}
          selectedValue={newDiary.weather}
        />

        <DiaryRadioButtonGroup<Visibility>
          name="visibility"
          title="Visibility"
          options={Object.values(Visibility).map((v) => ({
            label: v[0].toUpperCase() + v.slice(1),
            value: v,
          }))}
          onChange={handleChange}
          selectedValue={newDiary.visibility}
        />
      </div>

      <DiaryInput
        label="Comment"
        name="comment"
        onChange={handleChange}
        type="text"
        value={newDiary.comment}
        placeholder="Enter a new comment..."
      />

      <Button label="Create" type="submit" />
    </form>
  );
};

export default DiaryForm;
