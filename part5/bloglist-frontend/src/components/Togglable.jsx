import {
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const Togglable = forwardRef(
  ({ buttonLabel, children }, refs) => {
    const [showVisibility, setShowVisibility] =
      useState(false);

    const toggleVisibility = () =>
      setShowVisibility((prev) => !prev);

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
        />
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'flex-start',
          marginBottom: '6px',
        }}
      >
        {children}
        <Button
          type={'button'}
          label={'cancel'}
          onClick={toggleVisibility}
          testid={'cancel'}
        />
      </div>
    );
  }
);

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
