import Button from './Button';

const Logout = ({ handleClick }) => {
  return (
    <Button
      type={'button'}
      label={'logout'}
      onClick={handleClick}
    />
  );
};

export default Logout;
