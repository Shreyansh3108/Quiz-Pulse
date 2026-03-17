import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Existing Imports
import Home from './pages/Home';
import SubtopicSelector from './pages/SubtopicSelector';
import QuizArena from './pages/QuizArena';
import Results from './pages/Results';

// --- NEW IMPORTS (Crucial to fix the blank screen) ---
import Login from './pages/Login';
import Signup from './pages/Signup';
// ----------------------------------------------------

function App() {
  return (
    <Router>
      {/* Changed bg-slate-900 to bg-[#0a0c10] 
          This matches your Home.jsx background perfectly! 
      */}
      <div className="min-h-screen bg-[#0a0c10] text-white selection:bg-blue-500/30">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Navigation & Quiz Routes */}
          <Route path="/select/:category" element={<SubtopicSelector />} />
          <Route path="/quiz/:category/:subtopics" element={<QuizArena />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;