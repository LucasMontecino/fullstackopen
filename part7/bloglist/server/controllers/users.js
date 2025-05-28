const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  return res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  return res.json(user);
});

module.exports = usersRouter;
