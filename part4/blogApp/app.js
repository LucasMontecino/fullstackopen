require('express-async-errors');
const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');

const app = express();

mongoose.set('strictQuery', false);

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
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use(
  '/api/blogs',
  middleware.userExtractor,
  blogsRouter
);
app.use('/api/users', usersRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
