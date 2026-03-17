import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle } from 'lucide-react';
import { fetchSubtopics } from '../services/api'; // Ensure this path is correct

const SubtopicSelector = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [subtopics, setSubtopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubtopics = async () => {
      try {
        const response = await fetchSubtopics(category);
        setSubtopics(response.data);
      } catch (err) {
        console.error("Error fetching subtopics:", err);
      } finally {
        setLoading(false);
      }
    };
    getSubtopics();
  }, [category]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading Topics...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Categories
      </button>

      <h1 className="text-4xl font-bold mb-2">{category}</h1>
      <p className="text-slate-400 mb-10">Select a subtopic to begin your session.</p>

      <div className="space-y-4">
        {subtopics.map((topic) => (
          <div 
            key={topic}
            onClick={() => navigate(`/quiz/${category}/${topic}`)}
            className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex justify-between items-center cursor-pointer hover:border-blue-500 hover:bg-slate-750 transition-all group"
          >
            <span className="text-xl font-medium">{topic}</span>
            <PlayCircle className="w-6 h-6 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtopicSelector;