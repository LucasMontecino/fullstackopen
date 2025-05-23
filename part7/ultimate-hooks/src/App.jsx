import CreateNew from './components/CreateNew';
import { useField, useResource } from './hooks';
import List from './components/List';

const App = () => {
  const [content, cleanContent] = useField('text');
  const [name, cleanName] = useField('text');
  const [number, cleanNumber] = useField('text');

  const [notes, noteService] = useResource(
    'http://localhost:3005/notes'
  );
  const [persons, personService] = useResource(
    'http://localhost:3005/persons'
  );

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    cleanContent();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: name.value,
      number: number.value,
    });
    [cleanName, cleanNumber].forEach((func) => func());
  };

  return (
    <div>
      <CreateNew
        title="notes"
        handleSubmit={handleNoteSubmit}
        fields={[
          {
            label: 'content',
            input: <input {...content} />,
          },
        ]}
      />

      <List
        items={notes}
        handleRender={(n) => <p>{n.content}</p>}
      />

      <CreateNew
        title="persons"
        handleSubmit={handlePersonSubmit}
        fields={[
          { label: 'name', input: <input {...name} /> },
          { label: 'number', input: <input {...number} /> },
        ]}
      />

      <List
        items={persons}
        handleRender={(p) => (
          <p>
            {p.name} {p.number}
          </p>
        )}
      />
    </div>
  );
};

export default App;
