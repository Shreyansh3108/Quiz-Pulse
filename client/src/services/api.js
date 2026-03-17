import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quiz-pulse-api.onrender.com/api',
});

export const fetchQuestions = (category, subtopic) => 
  API.get(`/questions`, { params: { category, subtopic } });

export const fetchSubtopics = (category) => 
  API.get(`/subtopics/${category}`);

export default API;