const supertest = require('supertest');
const bcrypt = require('bcrypt');
const {
  test,
  describe,
  beforeEach,
  after,
} = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const User = require('../models/user');
const helper = require('./test.helper');
const mongoose = require('mongoose');

const api = supertest(app);

describe('initially has one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash(
      'lucas_2025',
      10
    );

    const user = new User({
      username: 'lucasm9',
      name: 'Lucas Montecino',
      passwordHash,
    });

    await user.save();
  });

  describe('register new users', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: 'juansalvio',
        name: 'Juan Salvio',
        password: 'juan_2025',
      };

      await api
        .post('/api/register')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert.strictEqual(
        usersAtEnd.length,
        usersAtStart.length + 1
      );
      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes('juansalvio'));
    });

    test('fails with status code 400 if username already exists', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'lucasm9',
        name: 'Lucas Montecino',
        password: 'lucas_2025',
      };

      const result = await api
        .post('/api/register')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert.strictEqual(
        usersAtStart.length,
        usersAtEnd.length
      );
      assert(
        result.body.error.includes(
          'username already exists'
        )
      );
    });

    test('fails with status code 400 if password is too short', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'ricardoblanco',
        name: 'Ricardo Blanco',
        password: 'rw',
      };

      const result = await api
        .post('/api/register')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert.strictEqual(
        usersAtStart.length,
        usersAtEnd.length
      );
      assert(
        result.body.error.includes(
          'password must have at least 3 characters'
        )
      );
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
