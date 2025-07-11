import type { IDiaryRadioButton } from '../types';

const DiaryRadioButton = <T extends string>({
  name,
  value,
  label,
  selectedValue,
  onChange,
}: IDiaryRadioButton<T>) => {
  return (
    <div>
      <input
        id={`${name}-${value}`}
        name={name}
        value={value}
        onChange={onChange}
        checked={selectedValue === value}
        type="radio"
      />
      <label htmlFor={`${name}-${value}`}>{label}</label>
    </div>
  );
};

export default DiaryRadioButton;
