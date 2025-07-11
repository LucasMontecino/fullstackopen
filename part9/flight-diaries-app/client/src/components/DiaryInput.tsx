import type { IDiaryInput } from '../types';

const DiaryInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  type,
}: IDiaryInput) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 6,
      }}
    >
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        style={{
          padding: '6px 8px',
          border: '1px solid #ccc',
          borderRadius: 4,
          width: '30%',
        }}
      />
    </div>
  );
};

export default DiaryInput;
