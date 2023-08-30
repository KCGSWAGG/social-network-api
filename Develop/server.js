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

  // Create a new thought
app.post('/thoughts', async (req, res) => {
    try {
      const { thoughtText, username } = req.body;
      const thought = new Thought({ thoughtText, username });
      await thought.save();
      res.status(201).json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  });

// Get all thoughts
app.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });