const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought', // Assuming you have a Thought model
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Self-reference to the User model
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
