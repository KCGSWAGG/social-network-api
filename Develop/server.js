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
  app.put('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
      res.status(201).json(user);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Wrong input' });
    }
  });

  app.delete('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findOneAndDelete({_id:req.params.id});
      res.status(201).json({message: "success"});
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Wrong input' });
    }
  });
  app.post('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({_id:req.params.userId},{$addToSet:{friends:req.params.friendId}},{new:true});
      if (!user){
        return res.status(404).json({message: "no user with id"})
      }
      res.status(201).json(user);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Wrong input' });
    }
  });

  app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({_id:req.params.userId},{$pull:{friends:req.params.friendId}},{new:true});
      if (!user){
        return res.status(404).json({message: "no user with id"})
      }
      res.status(201).json(user);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Wrong input' });
    }
  });
  // Get all thoughts
app.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
});
// Create a new thought
app.post('/api/thoughts/:userid', async (req, res) => {
  try {
    console.log(req.params.userid)
    const { thoughtText, username } = req.body;
    const thought =  await Thought.create({ thoughtText, username });
    console.log(thought)
    const user = await User.findOneAndUpdate({_id:req.params.userId},{$push:{thoughts:thought._id}},{new:true})
    console.log(user)
    res.status(201).json(thought);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Wrong input' });
  }
});


