import PropTypes from 'prop-types';

const List = ({ items, handleRender }) => {
  return (
    <>
      {items.map((item) => (
        <div key={item.id}>{handleRender(item)}</div>
      ))}
    </>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  handleRender: PropTypes.func.isRequired,
};

export default List;
