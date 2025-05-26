const InputText = ({
  htmlFor,
  label,
  name,
  id,
  value,
  onChange,
  autoComplete,
  type,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default InputText;
