// 3. Main API Routes
// /api/auth/signup – register

// /api/auth/login – login and return token

// /api/game/random-word – get random word and hint

// /api/game/submit-score – submit score

// /api/leaderboard – top 10 scores
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import routes
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');
// const leaderboardRoutes = require('./routes/leaderboard');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
