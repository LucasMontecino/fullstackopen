const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCompare =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCompare)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, {
    expiresIn: 60 * 60,
  });

  return res.json({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
