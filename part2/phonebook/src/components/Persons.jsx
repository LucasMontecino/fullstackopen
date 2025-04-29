import PersonDetails from './PersonDetails';

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <PersonDetails key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Persons;
