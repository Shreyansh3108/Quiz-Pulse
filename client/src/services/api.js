import axios from 'axios';

const API = axios.create({
  // Your correct live backend URL
  baseURL: 'https://quiz-pulse-zr61.onrender.com/api', 
});

// --- AUTH FUNCTIONS ---
export const loginUser = (formData) => API.post('/auth/login', formData);
export const signupUser = (formData) => API.post('/auth/signup', formData);

// --- QUESTION FUNCTIONS ---
export const fetchQuestions = (category, subtopic) => 
  API.get('/questions', { params: { category, subtopic } });

export const fetchSubtopics = (category) => 
  API.get(`/subtopics/${category}`);

export default API;