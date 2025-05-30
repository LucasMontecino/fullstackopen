import { TextField } from '@mui/material';

const InputText = ({ name, id, value, onChange, autoComplete, type }) => {
  return (
    <TextField
      type={type}
      name={name}
      id={id}
      label={name}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
};

export default InputText;
