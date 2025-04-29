import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    {
      id: 2,
      name: 'Ada Lovelace',
      number: '39-44-5323523',
    },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    {
      id: 4,
      name: 'Mary Poppendieck',
      number: '39-23-6423122',
    },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [search, setSearch] = useState('');

  const showPersons =
    search === ''
      ? persons
      : persons.filter((person) =>
          person.name
            .toLowerCase()
            .includes(search.toLowerCase())
        );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleNameChange = (e) =>
    setNewName(e.target.value);

  const handleNumberChange = (e) =>
    setNewNumber(e.target.value);

  const addName = (e) => {
    e.preventDefault();
    const findName = persons.find(
      (person) => person.name === newName
    );
    if (findName !== undefined) {
      alert(
        `${findName.name} is already added to phonebook`
      );
      return;
    }
    let newId = persons[persons.length - 1].id;
    const newObject = {
      id: (newId += 1),
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newObject));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={showPersons} />
    </div>
  );
};

export default App;
