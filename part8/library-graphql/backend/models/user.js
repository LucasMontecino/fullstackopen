const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: 6,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // the password hash should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);
