import DiaryRadioButton from './DiaryRadioButton';
import type { IDiaryRadioButtonGroup } from '../types';

const DiaryRadioButtonGroup = <T extends string>({
  title,
  options,
  name,
  selectedValue,
  onChange,
}: IDiaryRadioButtonGroup<T>) => {
  return (
    <div>
      <p>Select a {title}:</p>
      {options.map((el) => {
        return (
          <DiaryRadioButton
            key={el.value}
            label={el.label}
            value={el.value}
            name={name}
            onChange={onChange}
            selectedValue={selectedValue}
          />
        );
      })}
    </div>
  );
};

export default DiaryRadioButtonGroup;
