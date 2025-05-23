import { useEffect, useRef, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';
import NotificationError from './components/NotificationError';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const inputRef = useRef(null);

  const [notificationMessage, setNotificationMessage] =
    useState(null);

  const [errors, setErrors] = useState(null);

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

    const findPerson = persons.find(
      (person) =>
        person.name.toLowerCase() === newName.toLowerCase()
    );

    if (findPerson) {
      const dialog = confirm(
        `${findPerson.name} exists in the db, do you want to update the number?`
      );
      if (dialog) {
        personsService
          .update(findPerson.name, { number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === findPerson.id ? returnedPerson : p
              )
            );
            setNotificationMessage(
              `${returnedPerson.name} updated!`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNewName('');
            setNewNumber('');
            inputRef.current?.focus();
          })
          .catch((error) => {
            console.error({
              error: error.response.data.error,
            });
            setErrors(error.response.data.error);
            setTimeout(() => {
              setErrors(null);
            }, 5000);
          });
      }
      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(newObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotificationMessage(
          `${returnedPerson.name} added!`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setNewName('');
        setNewNumber('');
        inputRef.current?.focus();
      })
      .catch((error) => {
        console.error({ error: error.response.data.error });
        setErrors(error.response.data.error);
        setTimeout(() => {
          setErrors(null);
        }, 5000);
        setNewName('');
        setNewNumber('');
        inputRef.current?.focus();
      });
  };

  const deletedPerson = (resource) => {
    const deletedPerson = { ...resource };
    const dialog = confirm(`Delete ${resource.name} ?`);

    if (dialog) {
      personsService
        .deleteResourse(resource.id)
        .then(() => {
          setPersons(
            persons.filter(
              (person) => person.id !== resource.id
            )
          );
          alert(
            `${deletedPerson.name} was deleted successfully!`
          );
        })
        .catch((error) => {
          console.log({ message: error.message });
        });
    }
  };

  const handleCloseNotification = () => {
    setNotificationMessage(null);
  };

  const handleCloseNotificationError = () => {
    setErrors(null);
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error({ message: error.message });
      });
  }, []);

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <NotificationError
        message={errors}
        onClose={handleCloseNotificationError}
      />
      <Notification
        message={notificationMessage}
        onClose={handleCloseNotification}
      />
      <Filter search={search} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        inputRef={inputRef}
      />
      <h3>Numbers</h3>
      <Persons
        persons={showPersons}
        deletedPerson={deletedPerson}
      />
    </div>
  );
};

export default App;
