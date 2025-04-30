const PersonDetails = ({ person, onClick }) => {
  return (
    <p>
      {person.name} {person.number}
      <button type="button" onClick={onClick}>
        delete
      </button>
    </p>
  );
};

export default PersonDetails;
