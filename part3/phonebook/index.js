const express = require('express');
const morgan = require('morgan');

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const app = express();

morgan.token('post', function getBody(req) {
  return JSON.stringify(req.body, 2, null);
});

app.use(express.json());
app.use(express.static('dist'));

app.use(
  morgan('tiny', {
    skip: function (req, res) {
      return req.method === 'POST';
    },
  })
);

app.use(
  morgan(
    `:method :url :status :res[content-length] - :response-time ms :post`,
    {
      skip: function (req, res) {
        return req.method !== 'POST';
      },
    }
  )
);

app.get('/', (request, response) => {
  response.send(
    `<h1 style="text-align:center;font:900 2rem 'Trebuchet MS',Tahoma,sans-serif;">Hello World</h1>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const { id } = request.params;

  const person = persons.find((p) => p.id === id);

  if (!person) {
    return response.status(404).json({
      error: `Person with id: ${id} doesn't found.`,
    });
  }

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params;
  if (!id)
    return response
      .status(400)
      .json({ error: 'Please provide an id.' });

  const person = persons.find((p) => p.id === id);

  if (!person) {
    return response.status(404).json({
      error: `Person with id: ${id} doesn't found.`,
    });
  }

  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const generateRandomId = (length = 10) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
};

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;
  if (!name || !number)
    return response.status(400).json({
      error: 'You must provide a name and a number',
    });

  const person = persons.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (person)
    return response
      .status(400)
      .json({ error: 'Name must be unique' });

  const newPerson = {
    id: generateRandomId(),
    name,
    number: String(number),
  };

  persons = persons.concat(newPerson);
  response.status(201).json(newPerson);
});

app.get('/info', (request, response) => {
  const now = new Date();
  const currentDateTimeString = now.toString();
  response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDateTimeString}</p>    
    `);
});

const PORT = 3001;
app.listen(3001, () => {
  console.log(
    `Server running on port http://localhost:${PORT}`
  );
});
