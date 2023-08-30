const express = require('express');
const mongoose = require('mongoose');
const Thought = require('./thought'); // Assuming the Thought model is in a separate file
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/thoughtsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


