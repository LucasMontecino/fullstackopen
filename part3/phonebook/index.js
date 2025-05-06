require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const PORT = process.env.PORT;

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
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  const { id } = request.params;

  Person.findById(id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params;
  Person.deleteOne({ _id: id }).then((result) => {
    response.status(204).end();
  });
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;
  if (!name || !number)
    return response.status(400).json({
      error: 'You must provide a name and a number',
    });

  const newPerson = new Person({
    name,
    number: String(number),
  });

  newPerson.save().then((person) => {
    response.status(201).json(person);
  });
});

app.get('/info', (request, response) => {
  const now = new Date();
  const currentDateTimeString = now.toString();
  response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDateTimeString}</p>    
    `);
});

app.listen(PORT, () => {
  console.log(
    `Server running on port http://localhost:${PORT}`
  );
});
