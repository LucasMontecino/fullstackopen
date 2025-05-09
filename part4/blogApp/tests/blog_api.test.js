const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test.helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
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

test('a valid blog can be added', async () => {
  const newBlogs = {
    title: 'Always separate app and server files!',
    author: 'Nermine Slimane',
    url: 'https://dev.to/nermine-slimane/always-separate-app-and-server-files--1nc7',
    likes: 25,
  };

  await api
    .post('/api/blogs')
    .send(newBlogs)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length + 1
  );

  const titles = blogsAtEnd.map((b) => b.title);
  assert(
    titles.includes('Always separate app and server files!')
  );
});

after(async () => {
  await mongoose.connection.close();
});
