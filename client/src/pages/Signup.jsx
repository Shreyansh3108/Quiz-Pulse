import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { UserPlus, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', formData);
      setStatus({ type: 'success', msg: res.data.message });
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Something went wrong' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 mb-4">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white">Join the Arena</h1>
          <p className="text-slate-400 mt-2 text-center">Create an account to start your journey</p>
        </div>

        {status.msg && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm border ${
            status.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Choose Username</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. tech_ninja"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Create Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Min. 6 characters"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-emerald-500/10">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already a member? <Link to="/login" className="text-blue-400 hover:underline font-medium">Sign in instead</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;