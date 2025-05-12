const registerRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

registerRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3)
    return res.status(400).json({
      error: 'password must have at least 3 characters',
    });

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();

  return res.status(201).json(savedUser);
});

module.exports = registerRouter;
