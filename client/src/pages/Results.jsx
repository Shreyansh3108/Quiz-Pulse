import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, RotateCcw, Home } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 5 };
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="bg-slate-800 border border-slate-700 p-10 rounded-3xl max-w-md w-full text-center shadow-2xl">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold mb-2">Done!</h1>
        <p className="text-slate-400 mb-8">You scored {score} out of {total}</p>
        
        <div className="text-6xl font-black text-blue-500 mb-10">{percentage}%</div>

        <div className="flex flex-col gap-4">
          <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 bg-blue-600 p-4 rounded-xl font-bold">
            <Home size={20} /> Home
          </button>
          <button onClick={() => navigate(-1)} className="flex items-center justify-center gap-2 bg-slate-700 p-4 rounded-xl font-bold">
            <RotateCcw size={20} /> Retake
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;