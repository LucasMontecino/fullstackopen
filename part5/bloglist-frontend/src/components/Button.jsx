const Button = ({ type, onClick = null, label }) => {
  return (
    <button
      type={type}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
