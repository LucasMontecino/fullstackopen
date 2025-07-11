const Error = ({ error }: { error: string }) => {
  return error !== '' && <p style={{ color: 'red' }}>{error}</p>;
};

export default Error;
