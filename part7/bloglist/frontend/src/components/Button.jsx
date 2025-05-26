const Button = ({ type, onClick = null, label, testid }) => {
  return (
    <button
      type={type}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      data-testid={testid}
    >
      {label}
    </button>
  );
};

export default Button;
