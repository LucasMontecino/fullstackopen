import {
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Button from './Button';

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
        />
      </div>
    );
  }
);

export default Togglable;
