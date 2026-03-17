const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Question = require('./models/Question'); 
const User = require('./models/User');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

// --- UPDATED CORS FOR VERCEL ---
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://quiz-pulse-three.vercel.app" // Your specific Vercel URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const mongoURI = process.env.MONGODB_URL;

if (!mongoURI) {
  console.error("ERROR: MONGODB_URL is not defined!");
  // In production, we don't exit(1) immediately to allow logs to persist
}

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// --- BASE ROUTE ---
app.get('/', (req, res) => {
  res.send("Quiz Pulse API is running live...");
});

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.json({ username: user.username, message: "Welcome back!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- QUESTION ROUTES ---
app.get('/api/questions', async (req, res) => {
  try {
    const { category, subtopic } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (subtopic) filter.subtopic = subtopic;

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/subtopics/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const subtopics = await Question.distinct('subtopic', { category });
    res.json(subtopics);
  } catch (err) {
    res.status(500).json({ message: "Error fetching subtopics" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});