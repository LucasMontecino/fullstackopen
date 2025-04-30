import PersonDetails from './PersonDetails';

const Persons = ({ persons, deletedPerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <PersonDetails
          key={person.id}
          person={person}
          onClick={() => deletedPerson(person)}
        />
      ))}
    </div>
  );
};

export default Persons;
