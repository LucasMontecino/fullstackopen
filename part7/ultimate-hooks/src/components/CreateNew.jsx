import PropTypes from 'prop-types';

const CreateNew = ({ title, handleSubmit, fields }) => {
  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(({ label, input }, idx) => (
          <div key={idx}>
            <label>
              {label} {input}
            </label>
          </div>
        ))}
        <button type="submit">create</button>
      </form>
    </>
  );
};

CreateNew.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.array,
};

export default CreateNew;
