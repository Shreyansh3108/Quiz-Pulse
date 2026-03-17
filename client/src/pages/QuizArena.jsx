import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../services/api'; 
import { Timer, CheckCircle2, XCircle, ChevronRight, AlertCircle } from 'lucide-react';

const QuizArena = () => {
  // CRITICAL FIX: Extract 'subtopics' from URL (to match App.jsx) 
  // and rename to 'subtopic' for API use
  const { category, subtopics: subtopic } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('loading'); 

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // Diagnostic Log: Verify parameters in Browser Console
        console.log("SENDING TO API:", { category, subtopic });
        
        const res = await fetchQuestions(category, subtopic);
        if (res.data && res.data.length > 0) {
          setQuestions(res.data);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus('error');
      }
    };
    loadQuestions();
  }, [category, subtopic]);

  useEffect(() => {
    if (status !== 'ready' || showFeedback) return;
    if (timeLeft === 0) { handleNext(); return; }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showFeedback, status]);

  const handleAnswer = (option, index) => {
    if (showFeedback || !option) return;
    
    const currentQ = questions[currentIndex];
    const correctIdx = currentQ.correctOption;

    setSelectedOption(option);
    setShowFeedback(true);

    if (index === correctIdx) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(30);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      navigate('/results', { state: { score, total: questions.length } });
    }
  };

  if (status === 'loading') return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="text-blue-500 text-xl animate-pulse font-bold">📡 Connecting to Database...</div>
    </div>
  );

  if (status === 'error') return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-6 text-center text-white">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-xl font-bold">No Data Found</h2>
      <p className="text-slate-400 mt-2">Could not find questions for {subtopic || category}.</p>
      <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white px-8 py-2 rounded-lg">Go Back</button>
    </div>
  );

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-400 font-medium">Question {currentIndex + 1} / {questions.length}</span>
        <div className="text-blue-400 font-bold flex items-center gap-2">
          <Timer size={20}/> {timeLeft}s
        </div>
      </div>

      <div className="h-2 bg-slate-800 rounded-full mb-10 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-linear" 
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        ></div>
      </div>

      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl mb-8 shadow-xl">
        <h2 className="text-2xl font-semibold leading-relaxed">
          {currentQ?.questionText || currentQ?.question || "Question content missing"}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        {currentQ?.options?.map((opt, index) => {
          const isCorrect = index === currentQ.correctOption;
          const isSelected = opt === selectedOption;

          let btnStyle = "bg-slate-800 border-slate-700";
          if (showFeedback) {
            if (isCorrect) {
              btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
            } else if (isSelected) {
              btnStyle = "bg-red-500/20 border-red-500 text-red-400";
            } else {
              btnStyle = "bg-slate-800/40 border-slate-800 text-slate-600";
            }
          }

          return (
            <button 
              key={index} 
              onClick={() => handleAnswer(opt, index)} 
              disabled={showFeedback} 
              className={`w-full p-5 rounded-xl border-2 text-left flex justify-between items-center transition-all ${btnStyle}`}
            >
              <span className="text-lg">{opt}</span>
              {showFeedback && isCorrect && <CheckCircle2 size={22} className="text-emerald-500" />}
              {showFeedback && isSelected && !isCorrect && <XCircle size={22} className="text-red-500" />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-10">
        {showFeedback && (
          <button 
            onClick={handleNext} 
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all transform active:scale-95 shadow-lg"
          >
            {currentIndex + 1 === questions.length ? "View Final Results" : "Next Question"} 
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizArena;