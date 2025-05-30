import { Button as MaterialButton } from '@mui/material';

const Button = ({
  type,
  onClick = null,
  label,
  testid,
  color = 'primary',
  variant = 'contained',
  sx,
  size = 'medium',
}) => {
  return (
    <MaterialButton
      type={type}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      data-testid={testid}
      color={color}
      variant={variant}
      sx={sx}
      size={size}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;
