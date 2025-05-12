const {
  test,
  after,
  beforeEach,
  describe,
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test.helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const api = supertest(app);

describe('at the beginning some blogs are saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    for (const blog of helper.initialBlogs) {
      const blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

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

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb();

    assert.strictEqual(
      blogs.length,
      helper.initialBlogs.length
    );
  });

  describe('view some blogs', () => {
    test('unique identifier is correctly named id', async () => {
      const blogs = await helper.blogsInDb();
      const blogToView = Object.keys(blogs[0]);
      assert(blogToView.includes('id'));
    });
    test('a specific blog is within the returned blogs', async () => {
      const blogs = await helper.blogsInDb();
      const titles = blogs.map((b) => b.title);

      assert(titles.includes('Type wars'));
    });
  });

  describe('added new blogs', () => {
    test('a valid blog can be added', async () => {
      const result = await api
        .post('/api/login')
        .send({
          username: 'lucasm9',
          password: 'lucas_2025',
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const { token } = result.body;

      const newBlog = {
        title: 'Always separate app and server files!',
        author: 'Nermine Slimane',
        url: 'https://dev.to/nermine-slimane/always-separate-app-and-server-files--1nc7',
        likes: 25,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(
        blogsAtEnd.length,
        helper.initialBlogs.length + 1
      );

      const titles = blogsAtEnd.map((b) => b.title);
      assert(
        titles.includes(
          'Always separate app and server files!'
        )
      );
    });

    test('added a new blog without likes gives a value of zero', async () => {
      const result = await api
        .post('/api/login')
        .send({
          username: 'lucasm9',
          password: 'lucas_2025',
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const { token } = result.body;

      const newBlog = {
        title: 'Clean Architecture on Frontend',
        author: 'Alex Bespoyasov',
        url: 'https://dev.to/bespoyasov/clean-architecture-on-frontend-4311',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const blogToView = blogsAtEnd.at(-1);

      assert.strictEqual(blogToView.likes, 0);
    });

    test('attempted add a blog without title or url is forbidden', async () => {
      const result = await api
        .post('/api/login')
        .send({
          username: 'lucasm9',
          password: 'lucas_2025',
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const { token } = result.body;
      const newBlog = {
        author: 'Lucas',
        likes: 300,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(
        blogsAtEnd.length,
        helper.initialBlogs.length
      );
    });

    test('attempted add a blog without token is forbidden', async () => {
      const newBlog = {
        title: 'Clean Architecture on Frontend',
        author: 'Alex Bespoyasov',
        url: 'https://dev.to/bespoyasov/clean-architecture-on-frontend-4311',
      };

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(
        blogsAtEnd.length,
        helper.initialBlogs.length
      );
      assert(
        result.body.error.includes(
          'you must provide a token'
        )
      );
    });
  });

  describe('deletion of a note', () => {
    test('attempted to delete a blog without token is forbidden', async () => {
      const blogs = await helper.blogsInDb();
      const blogToDelete = blogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('updating a note', () => {
    test('updated specific blog', async () => {
      const blogs = await helper.blogsInDb();
      const blogToUpdate = blogs[0];

      const toUpdate = { likes: 12 };

      blogToUpdate.likes = toUpdate.likes;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('failed with status 404 if blog does not exist', async () => {
      const validateNonexistId =
        await helper.nonExistingId();

      await api
        .put(`/api/blogs/${validateNonexistId}`)
        .expect(404);
    });

    test('failed with status 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.put(`/api/blogs/${invalidId}`).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
