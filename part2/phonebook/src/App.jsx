import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
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

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled');
        setPersons(response.data);
      });
  }, []);

  console.log('rendering...', persons.length, 'persons');

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
