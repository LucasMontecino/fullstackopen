import { useState, useImperativeHandle, forwardRef } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [showVisibility, setShowVisibility] = useState(false);

  const toggleVisibility = () => setShowVisibility((prev) => !prev);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  if (!showVisibility) {
    return (
      <Button
        type={'button'}
        label={buttonLabel}
        onClick={toggleVisibility}
        testid={'show'}
        color="success"
      />
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start',
        marginBottom: '6px',
      }}
    >
      {children}
    </Box>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
