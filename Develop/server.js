const express = require('express');
const mongoose = require('mongoose');
const Thought = require('./models/thought');
const User = require('./models/user');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



  app.post('/api/users', async (req, res) => {
    try {
      const { username, email, thoughts, friends } = req.body;
      const user = new User({ username, email, thoughts, friends });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Wrong input' });
    }
  });

app.get('/api/users', async (req, res) => {
    try {
      const user = await User.find().populate("thoughts");
      res.status(201).json(user);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Wrong input' });
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findOne({_id:req.params.id});
      res.status(201).json(user);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Wrong input' });
    }
  });


