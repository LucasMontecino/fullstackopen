const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const Blog = require('./models/blog');

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error(
      'error connecting to MongoDB:',
      error.message
    );
  });

app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
