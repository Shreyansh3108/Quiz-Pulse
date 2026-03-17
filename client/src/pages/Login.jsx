import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { LogIn, ShieldCheck, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('user', res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 text-blue-400 mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 mt-2 text-center">Sign in to QuizPulse</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="text" 
            placeholder="Username"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-500/10">
            <LogIn size={20} /> Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          New here? <Link to="/signup" className="text-blue-400 hover:underline font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;