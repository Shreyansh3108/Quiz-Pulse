import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure ALL these icons are imported correctly
import { Code2, Globe, UserCheck, ChevronRight, Sparkles, LogOut } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Sync with LocalStorage to see if user is logged in
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    } catch (err) {
      console.error("LocalStorage access denied:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload(); 
  };

  const categories = [
    {
      id: 'DSA',
      title: 'Data Structures',
      desc: 'Master algorithms, trees, and complexity analysis.',
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500/20 to-transparent',
    },
    {
      id: 'Development',
      title: 'Development',
      desc: 'Fullstack, AI integration, and Cloud architecture.',
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/20 to-transparent',
    },
    {
      id: 'Interview',
      title: 'Interview Prep',
      desc: 'Behavioral questions and System Design patterns.',
      icon: <UserCheck className="w-6 h-6 text-purple-400" />,
      color: 'from-purple-500/20 to-transparent',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 selection:bg-blue-500/30">
      
      {/* --- SLEEK NAVBAR --- */}
      <nav className="relative z-20 max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">Q</div>
          <span className="text-2xl font-bold tracking-tight text-white">Quiz<span className="text-blue-500">Pulse</span></span>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              <span className="text-sm text-slate-400 font-medium">
                Welcome, <span className="text-white font-bold">{user}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-6 py-2.5 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all shadow-lg shadow-blue-500/10 active:scale-95"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Subtle Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <header className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-blue-400 mb-4 animate-fade-in">
            <Sparkles size={14} /> <span>AI-Powered Learning Path</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Technical</span> Edge.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            A minimalist arena designed for high-stakes interview preparation. 
            Test your pulse on DSA, Fullstack, and Core Engineering.
          </p>
        </header>

        {/* Category Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/select/${cat.id}`)}
              className="group relative p-8 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:scale-110 transition-transform duration-500">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {cat.title} <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent blur-2xl"></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white">55+</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Handcrafted Questions</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white">30s</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Blitz Timer</div>
            </div>
          </div>
          <div className="text-slate-600 text-sm font-medium">
            &copy; 2026 Quiz Pulse. Built for Excellence.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;