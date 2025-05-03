const Input = ({ value, handleChange, name, id }) => {
  return (
    <label>
      find countries{' '}
      <input
        name={name}
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export default Input;
