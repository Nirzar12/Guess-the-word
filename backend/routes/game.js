const express = require('express');
const router = express.Router();
const Word = require('../models/Word');
const User = require('../models/User'); 

// GET random word with hint
router.get('/random-word', async (req, res) => {
  try {
    const count = await Word.countDocuments(); // count total number of words
    const randomIndex = Math.floor(Math.random() * count); // generate random index
    const randomWord = await Word.findOne().skip(randomIndex); // find word at random index

    if (!randomWord) {
      return res.status(404).json({ msg: "No words found in database" });
    }

    res.json(randomWord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update user's score after a game round
router.post('/update-score', async (req, res) => {
    const { username, score } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Update the user's score
      user.score = score;
      await user.save();
  
      res.json({ msg: "Score updated successfully!", score: user.score });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  // Get top 10 players by score
router.get('/leaderboard', async (req, res) => {
    try {
      const leaderboard = await User.find()
        .sort({ score: -1 }) // Sort by score in descending order
        .limit(10); // Limit to top 10 players
  
      res.json(leaderboard); // Return the leaderboard as a response
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
