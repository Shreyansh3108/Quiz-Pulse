import axios from 'axios';

const API = axios.create({
  // Use the exact URL from your Render dashboard screenshot
  baseURL: 'https://quiz-pulse-zr61.onrender.com/api', 
});

export default API;