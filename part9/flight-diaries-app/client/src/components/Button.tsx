import type { IButton } from '../types';

const Button = ({ label, type }: IButton) => {
  return (
    <button
      type={type}
      className="btn"
      style={{
        border: 'none',
        padding: '6px 24px',
        borderRadius: 4,
        cursor: 'pointer',
        marginTop: 16,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
