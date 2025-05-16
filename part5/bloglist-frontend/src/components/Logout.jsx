import Button from './Button';

const Logout = ({ handleClick }) => {
  return (
    <Button
      type={'button'}
      label={'logout'}
      onClick={handleClick}
      testid={'logout'}
    />
  );
};

export default Logout;
