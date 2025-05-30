const { test, describe } = require('node:test');
const assert = require('node:assert');

const helpers = require('../utils/list_helper');

const oneBlog = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Hello World',
    author: 'Juan Ricardo',
    url: '',
    likes: 360,
  },
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('for dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = helpers.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe('total likes', () => {
  const emptyBlogs = [];

  test('of empty list is zero', () => {
    assert.strictEqual(helpers.totalLikes(emptyBlogs), 0);
  });

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(helpers.totalLikes(oneBlog), 360);
  });

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(helpers.totalLikes(blogs), 36);
  });
});

describe('favorite blog', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(helpers.favoriteBlog([]), 0);
  });

  test('when list has only one blog equals to the only blog', () => {
    const blog = {
      id: '5a422aa71b54a676234d17f8',
      title: 'Hello World',
      author: 'Juan Ricardo',
      url: '',
      likes: 360,
    };
    assert.deepStrictEqual(
      helpers.favoriteBlog(oneBlog),
      blog
    );
  });
  test('of a bigger list obtain the correct favorite object', () => {
    const result = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    };
    assert.deepStrictEqual(
      helpers.favoriteBlog(blogs),
      result
    );
  });
});

describe('author with most blogs', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(helpers.mostBlogs([]), 0);
  });

  test('when list have only one blog equals to the only blog', () => {
    const result = { author: 'Juan Ricardo', blogs: 1 };
    assert.deepStrictEqual(
      helpers.mostBlogs(oneBlog),
      result
    );
  });

  test('of a bigger list of blogs returns the author with most blogs correctly', () => {
    const result = { author: 'Robert C. Martin', blogs: 3 };

    assert.deepStrictEqual(
      helpers.mostBlogs(blogs),
      result
    );
  });
});

describe('author with most likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(helpers.mostLikes([]), 0);
  });

  test('when list have only one blog equals to the only blog', () => {
    const result = { author: 'Juan Ricardo', likes: 360 };
    assert.deepStrictEqual(
      helpers.mostLikes(oneBlog),
      result
    );
  });

  test('of a bigger list of blogs returns the author with most likes correctly', () => {
    const result = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };

    assert.deepStrictEqual(
      helpers.mostLikes(blogs),
      result
    );
  });
});
